const compose = (...func) => (Component) => {
  return func.reduceRight((prevComponent, func) => func(prevComponent), Component);
};

export default compose;