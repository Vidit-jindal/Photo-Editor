onload = function () {
    const editor = document.getElementById("editor");
    const context = editor.getContext("2d");
    const toolbar = document.getElementById("toolbar");
    
    const tools = {
        "upload" : function () {
            const upload = document.createElement('input');
            upload.type = "file";
            upload.click();
            upload.onchange = function() {
                const img = new Image();
                img.onload = () => {
                    editor.width = img.width;
                    editor.height = img.height;
                    context.drawImage(img, 0,0);
                };

