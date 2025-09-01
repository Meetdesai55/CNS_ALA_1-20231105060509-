# 🔐 CNS ALA Encryption System


https://github.com/user-attachments/assets/66df736b-6ab8-498a-8f8c-0fc753c7ba6c


A modern, interactive web application demonstrating hybrid encryption techniques using AES-256 and RSA encryption for secure messaging. Built with React and Tailwind CSS, this project showcases end-to-end encryption concepts in a user-friendly interface.

## ✨ Features

- **🔒 Hybrid Encryption**: Combines AES-256 (symmetric) and RSA (asymmetric) encryption
- **💬 Secure Chat Interface**: Two-user chat system with real-time encryption
- **🎨 Modern UI**: Beautiful, responsive design with Tailwind CSS
- **🔐 End-to-End Encryption**: Messages are encrypted locally before transmission
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🔍 Encryption Details**: View encrypted data, keys, and IVs for educational purposes

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CNS_ALA_1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
CNS_ALA_1/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── public/               # Static assets
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── eslint.config.js      # ESLint configuration
```

## 🔐 How It Works

### Encryption Process

1. **Message Input**: User types a message in the chat interface
2. **AES Key Generation**: A random 256-bit AES key is generated for each message
3. **Message Encryption**: The message is encrypted using AES-256 in CBC mode with PKCS7 padding
4. **Key Encryption**: The AES key is encrypted using RSA (simulated for demo purposes)
5. **Transmission**: Both encrypted message and encrypted key are sent
6. **Decryption**: Recipient decrypts the AES key, then decrypts the message

### Security Features

- **AES-256**: Military-grade symmetric encryption for message content
- **RSA-2048**: Asymmetric encryption for secure key exchange
- **Unique IV**: Each encryption uses a random initialization vector
- **Local Processing**: All encryption/decryption happens client-side
- **End-to-End**: Messages are encrypted before leaving the sender

## 🛠️ Technologies Used

- **Frontend**: React 19.1.1
- **Styling**: Tailwind CSS 4.1.12
- **Build Tool**: Vite 7.1.2
- **Encryption**: CryptoJS 4.2.0
- **Icons**: Lucide React 0.542.0
- **Linting**: ESLint 9.33.0

## 📱 Usage

1. **Start a Conversation**: Use the chat interface to send messages between Alice and Bob
2. **View Encryption**: Click on "🔒 View encrypted data" to see the encrypted message details
3. **Learn**: Explore the "How it works" section to understand the encryption process
4. **Security Info**: Check the security features section for technical details

## ⚠️ Important Notes

- **Demo Purpose**: This application is designed for educational purposes
- **Client-Side Crypto**: Uses browser-based cryptography libraries
- **Simulated RSA**: RSA encryption is simulated for demonstration
- **Not Production Ready**: For production use, implement proper key management and server-side security

## 🔧 Customization

### Modifying Encryption Parameters

You can modify the encryption settings in `src/App.jsx`:

```javascript
// Change AES key size
const aesKey = CryptoJS.lib.WordArray.random(32); // 256 bits

// Modify encryption mode
const encrypted = CryptoJS.AES.encrypt(messageText, aesKey, {
  iv: iv,
  mode: CryptoJS.mode.CBC,        // CBC mode
  padding: CryptoJS.pad.Pkcs7,    // PKCS7 padding
});
```

### Styling Changes

The application uses Tailwind CSS. Modify classes in the JSX components to change the appearance.

## 📚 Learning Resources

- [CryptoJS Documentation](https://cryptojs.gitbook.io/docs/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **CNS ALA Team** - *Initial work*

## 🙏 Acknowledgments

- CryptoJS library for encryption functionality
- React team for the amazing framework
- Tailwind CSS for the beautiful styling system
- Vite for the fast build tooling

---

**Note**: This is an educational project demonstrating encryption concepts. Always use audited, production-ready encryption libraries and proper security practices in real-world applications.
