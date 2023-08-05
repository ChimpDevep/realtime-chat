// Replace the following with your Firebase config object from the Firebase Console.
var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get references to the database
var database = firebase.database();

// Listen for the "send" button click event
document.getElementById("send").addEventListener("click", function() {
  var message = document.getElementById("message").value.trim();
  if (message !== "") {
    // Get the current user (you should have already set up authentication)
    var user = firebase.auth().currentUser;

    // Push the message to the database
    database.ref("messages").push({
      user: user.displayName || "Anonymous",
      message: message
    });

    // Clear the input field
    document.getElementById("message").value = "";
  }
});

// Listen for new messages in the database
database.ref("messages").on("child_added", function(snapshot) {
  var message = snapshot.val();
  displayMessage(message);
});

// Display the message in the chat box
function displayMessage(message) {
  var chatBox = document.getElementById("chat-box");
  var newMessage = document.createElement("div");
  newMessage.innerText = message.user + ": " + message.message;
  chatBox.appendChild(newMessage);
}
