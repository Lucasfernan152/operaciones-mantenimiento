
interface valuesMapped {
    key: string,
    value: string
}


export const useMappedEnums = (Enum:{}) => {

    const outputArray = Object.keys(Enum).map(key => ({
        key,
        value: Enum[key as keyof typeof Enum]
    }));

    return outputArray
}