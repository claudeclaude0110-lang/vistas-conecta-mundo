# Vistas Cubanas

Crea una app completa tipo Tinder/Badoo llamada Ligo para cubanos que conecta con el mundo entero (Cuba + exiliados en Miami, España, México, Colombia, etc.). Usa exactamente este diseño: fondo negro oscuro #04101f, colores azul marino #0d2b4e, rosa fuerte #ff3e8a, tipografía Sora + Inter, máximo 560px.



Funciones obligatorias (mejoradas y adictivas):



1. Registro (paso a paso exacto):

   - Pantalla 1: Hero bonito con logo grande “Vistas” y foto de perfil.

   - Pantalla 2: Nombre, edad, provincia/ciudad (select con Cuba + Miami, Madrid, etc.), bio corta.

   - Pantalla 3: Verificación selfie con cámara y animación “¡Verificado!”.

   - Pantalla 4: Resumen completo del perfil con botón “Crear mi cuenta”.



2. Home Swipe principal:

   - Modo “Cuba” y “Relaciones a distancia” con botón superior.

   - Card gigante con foto (fondo degradado + overlay), nombre, edad, provincia, bio y chip verificado.

   - 3 bots animados flotando en el fondo.

   - Swipe fluido con drag (izquierda = no, derecha = like, estrella para super like).

   - Animación de match con confeti y notificación.



3. Reels:

   - Feed vertical de reels de 5-10 segundos con “yumas” cubanos (estilo TikTok).

   - Botón “Sube mi reel” (demo: abre toast).

   - Cada reel con nombre, ciudad, caption y botón para compartir.



4. Chat:

   - Lista de chats con avatar, nombre, preview y tiempo.

   - Pantalla de chat: header con foto y nombre, feed de burbujas (tuyas en rosa, otras en azul oscuro).

   - Burbujas de regalo con flor animada.

   - Input con stickers (), foto, voz y enviar.

   - Mensajes con “en línea” y respuestas automáticas.



5. Sistema de monedas:

   - En perfil y topbar: contador de monedas.

   - Botón “Comprar monedas” abre sheet con paquetes (50, 150, 400, 1000) y precios simulados.

   - Botón “Enviar regalo” abre menú de flores/emojis (🌹 10 monedas, 💐 25, etc.).

   - Regalo vuela animado hacia el chat del match.



6. Perfil:

   - Foto grande, nombre, edad, ciudad, streak.

   - Estadísticas (Likes, Matches, Regalos).

   - Intereses como chips.

   - Botones: Comprar monedas + Enviar regalo + Recomienda a tu amigo.



7. Bodas:

   - Página bonita “Ver parejas que se casaron con Vistas” con grid de 4 parejas reales (fotos, nombre y distancia).



8. Notificaciones y toast:

   - Badge de notificaciones, toast con mensajes.



9. Diseño y experiencia:

   - Todo responsive, animaciones suaves, oscuro y bonito.

   - Botón de compartir en perfil.

   - Interfaz súper rápida y moderna.

   - Todo en español cubano.



Genera todo el código HTML + CSS + JS completo y listo para exportar como APK. Incluye el sistema de monedas virtuales, regalos animados, reels, boda y swipe mejorado.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8aaa711e-26a3-49c1-911e-eca885576be8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
