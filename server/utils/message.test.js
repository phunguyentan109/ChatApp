const expect = require("expect");
const {generateMessage} = require("./message");


describe("generateMessage", () => {
    it("should generate correct object", () => {
        let from = "Jen";
        let text = "Some message";
        let message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe("number");
        expect(message).toMatchObject({from, text});
    })
})
