

## Ajuste de centrado de la foto de Juan

La foto de Juan actualmente usa `object-[center_15%]` que posiciona la imagen muy arriba. Voy a ajustar el `object-position` para centrar mejor su rostro, probablemente cambiando a `object-[center_30%]` o `object-[center_25%]` y posiblemente aumentando el `scale` para un mejor encuadre.

### Cambio
- **`src/pages/Index.tsx` línea 134**: Ajustar `object-[center_15%]` a `object-[center_30%]` y aumentar `scale-110` a `scale-125` para acercar más el rostro al centro del círculo.

