import { useState } from "react"

export default () => {
    const [state, setState] = useState(0);

    return () => setState(state + 1);
}