# ~tether

## Description

~tether is a comprehensive full-stack service designed for managing communities and posts using Clerk's webhooks. This project leverages Mongoose and MongoDB for database management, with a frontend built using React and Next.js. It effectively handles various events related to organizations, including creation, updates, deletions, and membership changes, ensuring seamless synchronization with the database. The service includes robust error handling, logging, and pagination features for efficient data management. Additionally, ~tether integrates with Clerk for user management and utilizes webhooks to provide real-time updates and maintain community memberships.

## Features

- **Organization Management**: Handles creation, updates, and deletion of organizations.
- **Membership Handling**: Manages member invitations, additions, and removals.
- **Error Handling**: Responds to errors for better debugging and stability.
- **Webhook Integration**: Listens to Clerk webhooks for real-time updates.
- **View Activities**: Provides visibility into recent actions and changes within the communities.
- **Commenting**: Allows users to comment on posts within communities.
- **User Invitations**: Enables sending invitations to new users to join communities.


## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Daniel-Azil/tether-app.git
    ```

2. Navigate to the project directory:
    ```bash
    cd tether-app
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables:
    Create a `.env` file in the root directory and add the following variables:
    ```env
    NEXT_CLERK_WEBHOOK_SECRET=your_secret_key
    ```

5. Start the server:
    ```bash
    npm start
    ```

## Usage

- **Handle Webhook Events**: The server listens for events from Clerk and processes them accordingly.
- **API Endpoints**: The server uses Next.js API routes to manage webhook requests and updates.

## Contributing

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature/your-feature
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m "Add feature"
    ```
4. Push to your branch:
    ```bash
    git push origin feature/your-feature
    ```
5. Create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Clerk Documentation](https://clerk.com/docs/)


