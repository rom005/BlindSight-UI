import React from "react";

export type Option = {
    name: string,
    content: React.FC<ContentProps>
}

export type ContentProps = {
    Header: React.FC
}