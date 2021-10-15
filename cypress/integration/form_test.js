describe('Pizza Order Application', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/pizza')
    })

    const nameInput = () => cy.get('input[id="name-input"]')
    const sizeDropdown = () => cy.get('select')
    const toppingBoxes = () => cy.get('[type="checkbox"]')
    const instructionsInput = () => cy.get('input[name=instructions]')
    const submitButton = () => cy.get('button[id="order-button"]')
    const sauceRadio = () => cy.get('[type="radio"]')

    it('Sanity test', () => {
        expect(1 + 2).to.equal(3);
        expect(2 + 2).not.to.equal(5);
        expect({}).not.to.equal({});
        expect({}).to.eql({});
    })

    it('Elements are showing?', () => {
        nameInput().should('exist')
        sizeDropdown().should('exist')
        toppingBoxes().should('exist')
        instructionsInput().should('exist')
        submitButton().should('exist')
        sauceRadio().should('exist')
    })
    describe('Input can be filled and submitted', () => {
        it('Inputs with interaction', () => {
            nameInput()
                .should('have.value', '')
                .type('Tony')
                .should('have.value', 'Tony')
            sizeDropdown()
                .should('have.value', '')
                .select('S')
                .select('M')
                .select('L')
                .select('XL')
            toppingBoxes()
                .check()
            sauceRadio()
                .check()
            instructionsInput()
                .should('have.value', '')
                .type('Fast Please!')
                .should('have.value', 'Fast Please!')

        })
        it('Order Button Working', () => {
            nameInput()
            .type('Tony')
            sizeDropdown()
            .select('L')
            toppingBoxes()
            .check()
            sauceRadio()
            .check()
            instructionsInput()
            .type('Fast Please!')
            submitButton()
            .click()

        })
    })

})

