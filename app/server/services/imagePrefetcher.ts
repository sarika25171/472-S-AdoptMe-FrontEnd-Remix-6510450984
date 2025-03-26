async function prefetchImage(url: string) {
    const respond = await fetch(url);
    const blob = await respond.blob();
    const array = await blob.arrayBuffer();
    const buffer = Buffer.from(array);
    const base64 = buffer.toString('base64');
    const img = `data:image/png;base64,${base64}`;
    return img;
}

export default prefetchImage;