import React from "react";
import Main from "./main";
import { StarknetProvider } from "@/providers/StarknetProvider";

const page = () => {
    return (
        <StarknetProvider>
            <Main />
        </StarknetProvider>
    );
};

export default page;
