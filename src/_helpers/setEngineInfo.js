// Set engine info from request
export const setEngineInfo = (engine) => {
  return {
    _id: engine._id,
    name: engine.name,
    price: engine.price,
    comments: engine.comments || "Aucun commentaires",
    location: engine.location,
    image: "https://orig00.deviantart.net/5370/f/2017/239/7/d/steam_engine_by_pajunen-dblibu5.jpg",
    level: engine.level,
  };
};
