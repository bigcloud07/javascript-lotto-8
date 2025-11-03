export async function inputErrorHandler(inputView, outputView) {
    while (true) {
        try {
            return await inputView();
        } catch (error) {
            outputView.printMessage(error.message);
        }
    }
}
