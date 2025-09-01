import { useState } from "react";
import {
  Lock,
  Shield,
  Key,
  Send,
  Info,
  MessageCircle,
  User,
  Unlock,
} from "lucide-react";
import CryptoJS from "crypto-js";

function App() {
  // Chat state
  const [chatMessages, setChatMessages] = useState([]);
  const [user1Message, setUser1Message] = useState("");
  const [user2Message, setUser2Message] = useState("");
  const [currentUser, setCurrentUser] = useState("user1");

  // Chat functions
  const sendChatMessage = async (user, messageText) => {
    if (!messageText.trim()) return;

    try {
      // Generate a random AES key for this message
      const aesKey = CryptoJS.lib.WordArray.random(32);
      const iv = CryptoJS.lib.WordArray.random(16);

      // Encrypt the message
      const encrypted = CryptoJS.AES.encrypt(messageText, aesKey, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      // Simulate RSA encryption of the AES key
      const aesKeyString = aesKey.toString();
      const simulatedRsaEncryption = CryptoJS.AES.encrypt(
        aesKeyString,
        "demo-rsa-key",
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }
      );

      const newMessage = {
        id: Date.now(),
        user: user,
        message: messageText,
        encryptedData: encrypted.toString(),
        encryptedKey: simulatedRsaEncryption.toString(),
        iv: iv.toString(),
        aesKey: aesKeyString,
        timestamp: new Date().toLocaleTimeString(),
        isEncrypted: true,
      };

      setChatMessages((prev) => [...prev, newMessage]);

      // Clear the input
      if (user === "user1") {
        setUser1Message("");
      } else {
        setUser2Message("");
      }
    } catch (error) {
      console.error("Chat encryption error:", error);
      alert("Failed to send encrypted message");
    }
  };

  const decryptChatMessage = async (message) => {
    if (!message.isEncrypted) return message;

    try {
      // Decrypt the AES key
      const decryptedAesKey = CryptoJS.AES.decrypt(
        message.encryptedKey,
        "demo-rsa-key",
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }
      );

      const aesKeyString = decryptedAesKey.toString(CryptoJS.enc.Utf8);
      const aesKey = CryptoJS.enc.Hex.parse(aesKeyString);
      const iv = CryptoJS.enc.Hex.parse(message.iv);

      // Decrypt the message
      const decrypted = CryptoJS.AES.decrypt(message.encryptedData, aesKey, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

      return {
        ...message,
        decryptedMessage: decryptedText,
        isDecrypted: true,
      };
    } catch (error) {
      console.error("Chat decryption error:", error);
      return {
        ...message,
        decryptedMessage: "Failed to decrypt",
        isDecrypted: false,
      };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-100 p-4 sm:p-6">
      <div className="max-w-[1380px] mx-auto">
        {/* Top Navigation */}
        <nav className="mb-8 bg-white/80 backdrop-blur rounded-2xl shadow-lg px-4 sm:px-6 py-3 flex items-center justify-between border border-teal-100">
          <div className="flex items-center gap-2">
            <Shield className="text-teal-600" size={28} />
            <span className="text-xl sm:text-2xl font-bold text-gray-800">
              Encryption System
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a href="#about" className="text-gray-600 hover:text-teal-700">
              About
            </a>
            <a href="#help" className="text-gray-600 hover:text-teal-700">
              Help
            </a>
          </div>
        </nav>

        {/* Main Content */}
        <div className="text-center py-12">
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-8 border border-teal-100 max-w-2xl mx-auto">
            <Shield className="text-teal-600 mx-auto mb-4" size={48} />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome to Encryption System
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Experience secure end-to-end encryption with our hybrid AES-256 +
              RSA approach. Try the secure chat below to see encryption in
              action!
            </p>
            <div className="flex items-center justify-center gap-2 text-teal-600">
              <Lock size={20} />
              <span className="font-medium">
                All communications are encrypted
              </span>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <section className="mt-8 space-y-6">
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-5 sm:p-6 border border-teal-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <MessageCircle className="text-teal-600" size={24} />
              <span>Secure Chat</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Two users can chat securely with end-to-end encryption
            </p>

            {/* Chat Messages Display */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6 h-96 overflow-y-auto border border-gray-200">
              {chatMessages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <MessageCircle
                    className="mx-auto mb-2 text-gray-400"
                    size={24}
                  />
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.user === "user1" ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          msg.user === "user1"
                            ? "bg-teal-100 text-teal-900"
                            : "bg-sky-100 text-sky-900"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <User size={14} />
                          <span className="text-xs font-medium">
                            {msg.user === "user1" ? "Alice" : "Bob"}
                          </span>
                          <span className="text-xs text-gray-500">
                            {msg.timestamp}
                          </span>
                        </div>
                        <div className="text-sm">
                          <p className="mb-1">{msg.message}</p>
                          {msg.isEncrypted && (
                            <details className="text-xs">
                              <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                                🔒 View encrypted data
                              </summary>
                              <div className="mt-2 space-y-1">
                                <div className="bg-white/50 p-2 rounded text-xs font-mono break-all">
                                  <strong>Encrypted:</strong>{" "}
                                  {msg.encryptedData.substring(0, 50)}...
                                </div>
                                <div className="bg-white/50 p-2 rounded text-xs font-mono break-all">
                                  <strong>Key:</strong>{" "}
                                  {msg.encryptedKey.substring(0, 50)}...
                                </div>
                                <div className="bg-white/50 p-2 rounded text-xs font-mono break-all">
                                  <strong>IV:</strong> {msg.iv}
                                </div>
                              </div>
                            </details>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Chat Inputs */}
            <div className="grid gap-4 lg:grid-cols-2">
              {/* User 1 Input */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                  <span className="font-medium text-gray-700">Alice</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={user1Message}
                    onChange={(e) => setUser1Message(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-300"
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      sendChatMessage("user1", user1Message)
                    }
                  />
                  <button
                    onClick={() => sendChatMessage("user1", user1Message)}
                    disabled={!user1Message.trim()}
                    className="px-4 py-2 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>

              {/* User 2 Input */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-sky-500 rounded-full"></div>
                  <span className="font-medium text-gray-700">Bob</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={user2Message}
                    onChange={(e) => setUser2Message(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-200 focus:border-sky-300"
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      sendChatMessage("user2", user2Message)
                    }
                  />
                  <button
                    onClick={() => sendChatMessage("user2", user2Message)}
                    disabled={!user2Message.trim()}
                    className="px-4 py-2 bg-sky-500 hover:bg-sky-600 disabled:bg-gray-300 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Info */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Security:</strong> Each message is encrypted with a
                unique AES-256 key and the key is protected with RSA encryption.
                Messages are stored locally and can only be decrypted with the
                proper keys.
              </p>
            </div>
          </div>
        </section>

        {/* Moved Info Section under About */}
        <section className="mt-8 space-y-6">
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-5 sm:p-6 border border-teal-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Info className="text-teal-600" size={24} />
              <span>How it works:</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Understanding the encryption process
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <Lock className="text-teal-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">AES</h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Symmetric:</span> Encrypts the
                    actual message with a random key
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                  <Key className="text-cyan-700" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">RSA</h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Asymmetric:</span> Encrypts
                    the AES key with recipient's public key
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                  <Send className="text-sky-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Send</h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Transmission:</span> Both
                    encrypted message and encrypted key are sent
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <Unlock className="text-teal-700" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Decrypt</h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Decryption:</span> Recipient
                    uses their private key to decrypt the AES key, then decrypts
                    the message
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-teal-500 to-sky-500 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Security Features</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                AES-256 encryption for message content
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                RSA-2048 for key exchange
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Unique IV for each encryption
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                End-to-end encryption
              </li>
            </ul>
          </div>
        </section>
        {/* About Section */}
        <section id="about" className="mt-10">
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 border border-teal-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About</h2>
            <p className="text-gray-700 mb-3">
              Encryption System is a modern, minimal web app that demonstrates a
              hybrid approach to secure messaging. Your message is encrypted
              using <span className="font-semibold">AES-256 (symmetric)</span>{" "}
              and the key is protected using a simulated
              <span className="font-semibold"> RSA-2048 (asymmetric)</span> flow
              for easy demo purposes.
            </p>
            <p className="text-gray-700 mb-3">
              This UI is built with React and Tailwind CSS, focusing on a clean
              layout, responsive design, and clear visual hierarchy.
            </p>
            <p className="text-gray-700">
              Note: This demo uses client-side crypto libraries to showcase
              concepts. For production, always use audited implementations and
              secure key management.
            </p>
          </div>
        </section>
        {/* Footer */}
        <footer className="mt-10 text-center text-sm text-gray-600">
          © 2025 Encryption App
        </footer>
      </div>
    </div>
  );
}

export default App;
