# 📊 ISO 286 Tolerance Calculator

A React + TypeScript web application for calculating dimensional tolerances and deviations according to the **ISO 286** standard.

## 🎯 Features

- ✅ Fundamental tolerance calculation (IT01 - IT18)
- ✅ Support for shafts and holes with custom positions
- ✅ Dimensions range: 60-100 mm
- ✅ Display values in micrometers (µm) and millimeters (mm)
- ✅ Responsive interface with **Dark Mode** (☀️/🌙 toggle)
- ✅ Automatic system preference detection (light/dark)
- ✅ Input validation and intuitive error messages
- ✅ Dimension limit calculations (Max/Min)
- ✅ Bilingual support (Romanian/English) with **i18n**

## 🚀 Installation and Usage

### Requirements
- Node.js 16+ 
- npm or yarn

### Install Dependencies
```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Application will be available at `http://localhost:5173`.

### Production Build

Create a production build:

```bash
npm run build
```

### Start Server

After building, start the server:

```bash
npm start
```

Application will be available at `http://localhost:3000`.

## 📁 Project Structure

```
my-react-router-app/
├── app/
│   ├── components/
│   │   └── ToleranceCalculator.tsx    # Main component
│   ├── data/
│   │   └── isoData.ts                 # Consolidated ISO 286 data
│   ├── routes/
│   │   └── home.tsx
│   ├── root.tsx
│   └── app.css
├── build/
│   ├── client/                         # Compiled static assets
│   └── server/                         # Compiled server-side code
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🌍 Internationalization (i18n)

The application supports multiple languages:
- 🇷🇴 **Romanian** (default)
- 🇬🇧 **English**

Switch languages using the language toggle button in the header.

## 🎨 Themes

Application supports:
- **Light Mode** (default)
- **Dark Mode** (with toggle button in header)
- **Automatic detection** of system preferences

## 📊 ISO 286 Standard

The calculator conforms to the **ISO 286-1** standard which defines:
- Fundamental tolerances (IT01 - IT18)
- Fundamental deviations for shafts (a-z)
- Fundamental deviations for holes (A-Z)

## 🛠 Technologies

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Framework
- **Tailwind CSS** - Styling
- **Node.js** - Runtime

## 📝 License

MIT

---

