var checkExternal = url => url.includes("http://") || url.includes("https://") || url.includes(".") || url.includes("//") ? true : false;
export default checkExternal;