import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../components/AuthContext';
import { Plus, Pencil, Trash2, X, Phone, User } from 'lucide-react';
import { EmergencyButton } from '../components/EmergencyButton';

const BASE_URL = 'http://localhost:4000/api/v1';

const EmergencyContacts = () => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: ''
  });

  const fetchContacts = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/emergencycontact/EmergencyContact`, {
        userId: user._id
      });
      setContacts(response.data.emergencyContact || []);
    } catch (error) {
      toast.error('Failed to fetch contacts');
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingContact) {
        await axios.put(`${BASE_URL}/emergencycontact/updateEmergencyContact`, {
          ...formData,
          emergencyContactId: editingContact._id,
          userId: user._id
        });
        toast.success('Contact updated successfully');
      } else {
        const response = await axios.post(`${BASE_URL}/emergencycontact/createEmergencyContact`, {
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          userId: user._id
        });
        toast.success(response.data.message);
      }
      setIsModalOpen(false);
      setEditingContact(null);
      setFormData({ name: '', phoneNumber: '' });
      fetchContacts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`${BASE_URL}/emergencycontact/deleteEmergencyContact`, {
          data: {
            userId: user._id,
            emergencyContactId: id
          }
        });
        toast.success('Contact deleted successfully');
        fetchContacts();
      } catch (error) {
        toast.error('Failed to delete contact');
      }
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      phoneNumber: contact.phoneNumber
    });
    setIsModalOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center mb-8 px-4"
          >
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                Emergency Contacts
              </h1>
              <div className="ml-4">
                <EmergencyButton />
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsModalOpen(true);
                setEditingContact(null);
                setFormData({ name: '', phoneNumber: '' });
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-yellow-400/20 transition-all duration-300"
            >
              <Plus size={20} />
              Add Contact
            </motion.button>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-4"
          >
            <AnimatePresence>
              {contacts.map((contact) => (
                <motion.div
                  key={contact._id}
                  variants={itemVariants}
                  layout
                  className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 shadow-lg hover:shadow-yellow-400/10 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <User size={18} className="text-yellow-400" />
                        <h3 className="text-yellow-400 font-semibold text-lg">{contact.name}</h3>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Phone size={16} className="text-gray-400" />
                        <p>{contact.phoneNumber}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEdit(contact)}
                      className="flex-1 flex items-center justify-center gap-2 bg-yellow-400/20 text-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-400/30 transition-colors duration-300"
                    >
                      <Pencil size={16} />
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(contact._id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors duration-300"
                    >
                      <Trash2 size={16} />
                      Delete
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-gray-800 p-8 rounded-xl w-full max-w-md border border-yellow-400/20 shadow-xl"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-yellow-400">
                      {editingContact ? 'Edit Contact' : 'Add Contact'}
                    </h2>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X size={24} />
                    </motion.button>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">Name</label>
                      <div className="relative">
                        <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-gray-700/50 text-white pl-10 pr-4 py-3 rounded-lg border border-yellow-400/20 focus:border-yellow-400/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">Phone Number</label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                          className="w-full bg-gray-700/50 text-white pl-10 pr-4 py-3 rounded-lg border border-yellow-400/20 focus:border-yellow-400/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                          required
                        />
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-3 rounded-lg font-semibold shadow-lg hover:shadow-yellow-400/20 transition-all duration-300"
                    >
                      {editingContact ? 'Update Contact' : 'Add Contact'}
                    </motion.button>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;