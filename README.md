# Calculator Toleranțe Dimensionale

Aplicație React TypeScript pentru calculul toleranțelor și abaterilor dimensionale conform standardului ISO 286 (Tabelul 3.7).

## 🎯 Funcționalități

- ✅ Calcul toleranțelor fundamentale pentru dimensiuni între 60-100 mm
- ✅ Afișare valorilor în micrometri (µm) și milimetri (mm)
- ✅ Interfață modernă cu Tailwind CSS
- ✅ Validare input și mesaje de eroare
- ✅ Tabel comparativ cu toate treptele de precizie (IT01 - IT18)

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

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
