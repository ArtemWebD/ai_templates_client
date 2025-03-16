export default class DeleteSubmitState {
    static setState(isActive = true): void {
        localStorage.setItem("deleteSubmit", JSON.stringify(isActive));
    }

    static getState(): boolean {
        return JSON.parse(localStorage.getItem("deleteSubmit") || "true");
    }
}