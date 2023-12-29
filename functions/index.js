const functions = require("firebase-functions");
const admin = require("firebase-admin");
const logger = require("firebase-functions/logger");
const cors = require('cors')({ origin: true }); // Enable CORS for all routes

admin.initializeApp();

// Firestore reference
const db = admin.firestore();

// Create a user
exports.addUser = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    try {
      const { id, name, email } = request.body;

      // Log the received payload
      logger.info("Received payload:", request.body);

      // Add user to Firestore
      await db.collection("users").doc(id).set({ name, email });

      logger.info(`User added: ${id}`);

      response.status(200).send("User added successfully");
    } catch (error) {
      logger.error(`Error adding user: ${error.message}`);
      response.status(500).send("Internal Server Error");
    }
  });
});

// Get all users
exports.getUsers = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    try {
      const snapshot = await db.collection("users").get();
      const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      response.status(200).json(users);
    } catch (error) {
      logger.error(`Error getting users: ${error.message}`);
      response.status(500).send("Internal Server Error");
    }
  });
});

// Update a user
exports.updateUser = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    try {
      const { id, name, email } = request.body;

      // Log the received payload
      logger.info("Received payload:", request.body);

      // Update user in Firestore
      await db.collection("users").doc(id).update({ name, email });

      logger.info(`User updated: ${id}`);

      response.status(200).send("User updated successfully");
    } catch (error) {
      logger.error(`Error updating user: ${error.message}`);
      response.status(500).send("Internal Server Error");
    }
  });
});

// Delete a user
exports.deleteUser = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    try {
      const { id } = request.body;

      // Log the received payload
      logger.info("Received payload:", request.body);

      // Delete user from Firestore
      await db.collection("users").doc(id).delete();

      logger.info(`User deleted: ${id}`);

      response.status(200).send("User deleted successfully");
    } catch (error) {
      logger.error(`Error deleting user: ${error.message}`);
      response.status(500).send("Internal Server Error");
    }
  });
});
