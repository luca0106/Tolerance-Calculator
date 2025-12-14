# 📊 Calculator Toleranțe Dimensionale ISO 286

Aplicație web React + TypeScript pentru calculul toleranțelor și abaterilor dimensionale conform standardului **ISO 286**.

## 🎯 Funcționalități

- ✅ Calcul toleranțelor fundamentale (IT01 - IT18)
- ✅ Suport pentru arbori și alezaje cu poziții customize
- ✅ Dimensiuni între 60-100 mm
- ✅ Afișare valorilor în micrometri (µm) și milimetri (mm)
- ✅ Interfață responsivă cu **Dark Mode** (toggle ☀️/🌙)
- ✅ Detectare automată preferință sistem (light/dark)
- ✅ Validare input și mesaje de eroare intuitive
- ✅ Calcul dimensiuni limită (Max/Min)

## 🚀 Instalare și rulare

### Cerințe
- Node.js 16+ 
- npm sau yarn

### Instalare dependențe
```bash
npm install
```

### Development

Startați server-ul de development cu HMR:

```bash
npm run dev
```

Aplicația va fi disponibilă la `http://localhost:5173`.

### Production Build

Creați un build de producție:

```bash
npm run build
```

### Pornire Server

După build, porniți serverul:

```bash
npm start
```

Aplicația va fi disponibilă la `http://localhost:3000`.

## 📁 Structura Proiectului

```
my-react-router-app/
├── app/
│   ├── components/
│   │   └── ToleranceCalculator.tsx    # Componenta principală
│   ├── data/
│   │   └── isoData.ts                 # Date ISO 286 consolidate
│   ├── routes/
│   │   └── home.tsx
│   ├── root.tsx
│   └── app.css
├── build/
│   ├── client/                         # Static assets compilate
│   └── server/                         # Server-side code compilat
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Teme

Aplicația suportă:
- **Light Mode** (default)
- **Dark Mode** (cu toggle button în header)
- **Detectare automată** a preferințelor sistemului

## 📊 Standardul ISO 286

Calculator-ul este conforme cu standardul **ISO 286-1** care defineaza:
- Toleranțe fundamentale (IT01 - IT18)
- Abaterile fundamentale pentru arbori (a-z)
- Abaterile fundamentale pentru alezaje (A-Z)

## 🛠 Tehnologii

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Framework
- **Tailwind CSS** - Styling
- **Node.js** - Runtime

## 📝 Licență

MIT

---

