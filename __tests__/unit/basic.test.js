

const sum = (a, b) => a + b

describe('sum function', () => {
    it('should return correct sum of two numbers', () => {
        // setup - variable initialize, mock

        // execute test unit, test function
        const result = sum(1, 2)

        //compare expected result with actual result
        expect(result).toBe(3)
    })
})