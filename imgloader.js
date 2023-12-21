const imgLoader = ({ src, width, quality }) => {
    return src.indexOf(`wh:`) > -1 ? src : `${src}/wh:${width}/q:${quality || 75}`
}

export default imgLoader