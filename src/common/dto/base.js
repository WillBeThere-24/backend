export class BaseDto {
    constructor(body) {
        this.body = body
    }

    assignBody() {
        // Simple object spread for assignment
        Object.assign(this, this.body)
    }
}
