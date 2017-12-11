// Set engine info from request
export const setEngineInfo = (engine) => {
  return {
    _id: engine._id,
    name: engine.name,
    price: engine.price,
    comments: engine.comments,
    level: engine.level,
  };
};
