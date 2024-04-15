export const useImage = () => {
    const uploadImage = async (image) => {
        try {
            if (image === undefined || !image) {
                return {
                    img: "",
                    id: "",
                }
            }
            console.log(image.type);
            if (image.type == 'image/jpeg' ||
                image.type == 'image/png') {

                const data = new FormData();

                data.append("file", image);

                data.append('upload_preset', "cgb0zdwq");

                data.append("cloud_name", "dcrcc9b4h");
                const
                    res = await fetch("https://api.cloudinary.com/v1_1/dcrcc9b4h/image/upload", {
                        method: 'POST',
                        body: data
                    });
                const result = await res.json();
                return {
                    img: result.secure_url,
                    id: result.public_id
                }
            }
        } catch (error) {
            console.log(error.message);
            return " ";
        }
    };
    return { uploadImage};
}