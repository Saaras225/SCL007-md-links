# Markdown Links Extractor

## Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de la información que se quiere compartir.

![md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)

## Aplicación

La libreria (paquete npm) que se presenta, te permitirá extraer los links de los distintos documentos md que encuentre en tu directorio y verificar el estatus de los mismos.

## Instalación

Para poder instalar el paquete debes colocar en tu terminal:

```sh

npm install -g
```

## comandos a utilizar

- `Validación`: Te permite validar el estatus de funcionamiento (conexión) de los links con el comando:

```sh
--validate
```

-  `Estadistica`: Podras obtener la cantidad (número) de links que funcionan junto con la cantidad de links roto, usabdo el comanto: 

```sh
--stats
```
