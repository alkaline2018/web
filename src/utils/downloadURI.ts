export const downloadURI = ({ uri, name }: { uri: any; name: string; }) => {
    var link = document.createElement("a")
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
}