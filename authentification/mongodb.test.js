const { expect } = require("@jest/globals");
const { init, close, insertTestDocument, getTestDocument, removeTestDocument } = require("./mongodb");

describe("MongoDB", () => {
    it("Can insert and find a test document", async () => {
        // Arrange
        await init();

        // Act
        await removeTestDocument({ _id: 42 });
        await insertTestDocument({ _id: 42, hello: "world!" })
        const doc = await getTestDocument({ _id: 42 })

        // Assert
        expect(doc.hello).toBe("world!")

        // Clean
        await close();
    })
})
