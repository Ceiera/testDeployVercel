const removeUndifined = (objs: object) => {
    const clean = Object.fromEntries(Object.entries(objs).filter(([_, value]) => value !== undefined));
    return clean
}

export default removeUndifined

