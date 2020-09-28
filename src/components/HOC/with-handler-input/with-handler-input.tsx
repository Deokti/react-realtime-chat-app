import React, { useMemo, useState } from "react";


const withHandlerInput = (initialStateInput: Object) => (Wrapped: any) => {
  return (props: any) => {
    const initialInput = useMemo(() => initialStateInput, []);

    const [ input, setInput ] = useState(initialInput);

    const whenChangingInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.currentTarget;
      setInput((prevState) => ({ ...prevState, [name]: value }))
    }

    return (
      <Wrapped {...props}
        whenChangingInput={whenChangingInput}
        setInput={setInput}
        input={input} />
    )
  }
};

export default withHandlerInput;