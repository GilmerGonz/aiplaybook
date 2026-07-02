# AI Agency Playbook - PayPal Integration

## Estructura de Archivos

```
landing_page/
├── index.html          # Landing page principal (con PayPal)
├── descarga.html       # Página de descarga post-pago
├── api/
│   └── verify.js       # Serverless function para verificar pagos
├── AI_Agency_Playbook.pdf  # Tu eBook (colocar aquí)
├── vercel.json         # Configuración de Vercel
└── .env.example        # Ejemplo de variables de entorno
```

## Configuración Paso a Paso

### 1. Obtener credenciales de PayPal

1. Ve a [developer.paypal.com](https://developer.paypal.com)
2. Inicia sesión con tu cuenta de PayPal Business
3. Ve a **Dashboard → My Apps & Credentials**
4. En **REST API apps**, haz clic en **Create App**
5. Copia el **Client ID** y el **Secret**
6. Nota: El **Client ID** es público, el **Secret** es privado

### 2. Configurar en Vercel

1. Ve a tu proyecto en Vercel
2. Ve a **Settings → Environment Variables**
3. Agrega estas variables:
   - `PAYPAL_CLIENT_ID` = (tu Client ID)
   - `PAYPAL_CLIENT_SECRET` = (tu Secret)
   - `PAYPAL_ENV` = `sandbox` (para pruebas) o `live` (producción)
4. Haz clic en **Save**

### 3. Actualizar el Client ID en el código

Abre `index.html` y busca:
```javascript
const PAYPAL_CLIENT_ID = 'TU_CLIENT_ID_AQUI';
```

Reemplaza `TU_CLIENT_ID_AQUI` con tu Client ID real.

### 4. Colocar el PDF

Copia tu archivo PDF a la carpeta `landing_page/` con el nombre:
```
AI_Agency_Playbook.pdf
```

### 5. Desplegar

1. Sube todos los archivos a tu repositorio Git
2. Vercel desplegará automáticamente
3. Prueba el flujo completo

## Pruebas

### Modo Sandbox (pruebas)

1. Configura `PAYPAL_ENV=sandbox`
2. Usa tu Client ID de sandbox
3. Ve a [sandbox.paypal.com](https://sandbox.paypal.com) para crear una cuenta de prueba
4. Realiza una transacción de prueba

### Modo Live (producción)

1. Cambia `PAYPAL_ENV` a `live`
2. Usa tu Client ID de live
3. Los pagos serán reales

## Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `PAYPAL_CLIENT_ID` | Client ID de PayPal | `Ae...` |
| `PAYPAL_CLIENT_SECRET` | Secret de PayPal | `陈某...` |
| `PAYPAL_ENV` | Entorno de PayPal | `sandbox` o `live` |

## Solución de Problemas

### El botón de PayPal no aparece
- Verifica que el Client ID sea correcto
- Revisa la consola del navegador para errores
- Asegúrate de que el SDK de PayPal esté cargado

### La verificación falla
- Verifica que las variables de entorno estén configuradas en Vercel
- Revisa los logs de Vercel (Functions → Logs)
- Asegúrate de que el Client Secret sea correcto

### El PDF no se descarga
- Verifica que el archivo `AI_Agency_Playbook.pdf` esté en la carpeta raíz
- Asegúrate de que el nombre del archivo sea exacto (case-sensitive)
