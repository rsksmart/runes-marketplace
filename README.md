<img src="rootstock-logo.png" alt="RSK Logo" style="width:100%; height: auto;" />

# Runes Marketplace

This project is an open-source proof of concept implementing a Runes Marketplace. The primary goal is to allow users to buy and sell Runes on the Rootstock (RSK) network.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Support](#support)

## Overview

The Runes Marketplace consists of two main processes:
1. **Buy a Rune**: Users can buy Runes connecting their wallets. Once the users sign the buy transaction and pay for the Rune and gas costs, they own the Rune. 
2. **Sell a Rune**: Users can list their Runes and establish the price they want for them individually. To list a Rune, they must specified the address of the ERC1155 Rune representation on the Rootstock (RSK) network, the token ID and the price. 

## Technologies Used

- **Thirdweb Marketplace V3**: [Thirdweb Documentation](https://thirdweb.com/thirdweb.eth/MarketplaceV3)
- **Thirdweb TS SDK**: [Thirdweb Github](https://github.com/thirdweb-dev/js/tree/main#readme)
- **Tailwindcss**: [Tailwindcss Documentation](https://tailwindcss.com/docs/installation)

## Project Structure

```
├── app
│   ├── assets
│   ├── pages
│   └── utils
│       └── abi
├── components
│   ├── tabs
│   │   ├── BuyTab.tsx
│   │   ├── index.tsx
│   │   └── SellTab.tsx
│   └── ui
├── constants
├── functions
│   └── mock_index.ts
├── lib
│   └── utils.ts
├── package.json
```

## Installation

To clone and run this project locally, follow these steps:

1. **Clone the repository**:

   ```sh
   git clone https://github.com/rsksmart/rsk-runes-marketplace.git
   cd rsk-runes-marketplace
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the root directory and add necessary environment variables. Use as example the file `.env.example` that already exist in the root of the project.

4. **Run the development server**:

   ```sh
   npm run dev
   ```

## Usage

1. **Access the application**: Open [http://localhost:3000](http://localhost:3000) in your browser.
2. **Sell a Rune**: Navigate to the Sell tab, fill out the form, and submit to list a Rune on the marketplace.
3. **Buy a Rune**: Navigate to the Buy tab, click on the Rune you are interested in, connect your wallet, click on Buy, sign the transacction and enjoy your Rune.

## Contributing

We welcome contributions from the community. Please fork the repository and submit pull requests with your changes. Ensure your code adheres to the project's main objective.

## Support

For any questions or support, please open an issue on the repository or reach out to the maintainers.

# Disclaimer
The software provided in this GitHub repository is offered "as is," without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement.
- **Testing:** The software has not undergone testing of any kind, and its functionality, accuracy, reliability, and suitability for any purpose are not guaranteed.
- **Use at Your Own Risk:** The user assumes all risks associated with the use of this software. The author(s) of this software shall not be held liable for any damages, including but not limited to direct, indirect, incidental, special, consequential, or punitive damages arising out of the use of or inability to use this software, even if advised of the possibility of such damages.
- **No Liability:** The author(s) of this software are not liable for any loss or damage, including without limitation, any loss of profits, business interruption, loss of information or data, or other pecuniary loss arising out of the use of or inability to use this software.
- **Sole Responsibility:** The user acknowledges that they are solely responsible for the outcome of the use of this software, including any decisions made or actions taken based on the software's output or functionality.
- **No Endorsement:** Mention of any specific product, service, or organization does not constitute or imply endorsement by the author(s) of this software.
- **Modification and Distribution:** This software may be modified and distributed under the terms of the license provided with the software. By modifying or distributing this software, you agree to be bound by the terms of the license.
- **Assumption of Risk:** By using this software, the user acknowledges and agrees that they have read, understood, and accepted the terms of this disclaimer and assumes all risks associated with the use of this software.