import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';
import { getReceiverSocketId, io } from '../socket/socket.js';

// multiple named exports per module

export const sendMessage = async (req, res) => {
  const { message } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  // first, check if the conversation already existed
  let conversation = await Conversation.findOne({
    participents: { $all: [senderId, receiverId] },
  });
  // create the converation first, then create the message model that is coming from the sender
  if (!conversation) {
    conversation = await Conversation.create({
      participents: [senderId, receiverId],
    });
  }
  // create the message model
  const newMessage = new Message({
    senderId: senderId,
    receiverId: receiverId,
    message: message,
  });
  if (newMessage) {
    conversation.messages.push(newMessage._id);
  }

  // this will run in parallel
  await Promise.all([conversation.save(), newMessage.save()]);

  // SOCKET IO FUNCTIONALITY WILL BE HERE
  const receiverSocketId = getReceiverSocketId(receiverId);

  if (receiverSocketId) {
    // used to sent events to specific client
    io.to(receiverSocketId).emit('newMessage', newMessage);
  }

  res.status(201).json(newMessage);
};

export const getMessages = async (req, res) => {
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  // we need to get the conversation that both ids are within and then get all messages

  let conversation = await Conversation.findOne({
    participents: { $all: [senderId, receiverId] },
  }).populate('messages');

  if (!conversation) {
    return res.status(200).json([]);
  }

  const messages = conversation.messages;

  res.status(200).json(messages);
};
