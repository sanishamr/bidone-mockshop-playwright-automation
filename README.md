# Mock Shop website Automated Testing - Playwright

##  Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install playwright
   ```

2. **Start local server**:
   Serve the site locally using Live Server (VSCode extension) or:
   ```bash
   npx serve .
   ```
   update the url based on the server ( currently the server details in script is "http://localhost:3000/MockWebsite")

3. **Run tests**:
   ```bash
   npx playwright test
   ```

---

## Test Coverage Summary

###  `login.spec.ts`
- Validate login with correct credentials.
- Login fails and error message displayed when credentials not provided


###  `shop.spec.ts`
- Check that 6 products are listed 
- Verify product card contains code, price, UOM, and quantity 
- Test search functionality (search by product code) 
- Verify "Add to Basket" triggers correct alert message 
- Verify clear basket 
- verify Logout redirects to login page

###  `basket.spec.ts`
- Verify basket displays correct product info (Displays added products correctly)
- Validate Total value is calculated correctly
- Verify Clear Basket removes items
- Ensure "Logout" clears basket and redirects to login.
- Verify "Back to Shop" redirects to shop page.

---

##  Assumptions

- Login is considered successful if credentials are `user1 / user1`.
- The site is served at `http://localhost:3000` (or change based on local setup).

---

## Bonus Observations

- when products are added to basket, its not actually getting added to basket.