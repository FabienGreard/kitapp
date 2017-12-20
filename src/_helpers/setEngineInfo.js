// Set engine info from request
export const setEngineInfo = (engine) => {
  return {
    _id: engine._id,
    name: engine.name,
    price: engine.price,
    comments: engine.comments || "Aucun commentaires",
    location: engine.location,
    reserved: engine.reserved,
    image: new Buffer(engine.img.data).toString('base64'),
    level: engine.level,
  };
};
