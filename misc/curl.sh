#### Account Creation ####

echo "Starting to create number users"
    curl \
    --request POST \
    --data "username=user1&password=password&email=user1%40email.com&nickname=Matthew" \
    http://localhost:5001/auth/register

    curl \
    --request POST \
    --data "username=user2&password=password&email=user2%40email.com&nickname=Matthew" \
    http://localhost:5001/auth/register

    curl \
    --request POST \
    --data "username=user3&password=password&email=user3%40email.com&nickname=Matthew" \
    http://localhost:5001/auth/register

    curl \
    --request POST \
    --data "username=user4&password=password&email=user4%40email.com&nickname=Matthew" \
    http://localhost:5001/auth/register

    curl \
    --request POST \
    --data "username=user5&password=password&email=user5%40email.com&nickname=Matthew" \
    http://localhost:5001/auth/register

echo "Sleeping for 3 seconds before inserting character users"
sleep 3
echo "Shookt! Inserting character users";

    curl \
    --request POST \
    --data "username=usera&password=password&email=usera%40email.com&nickname=Matthew" \
    http://localhost:5001/auth/register

    curl \
    --request POST \
    --data "username=userb&password=password&email=userb%40email.com&nickname=Matthew" \
    http://localhost:5001/auth/register

    curl \
    --request POST \
    --data "username=userc&password=password&email=userc%40email.com&nickname=Matthew" \
    http://localhost:5001/auth/register

    curl \
    --request POST \
    --data "username=userd&password=password&email=userd%40email.com&nickname=Matthew" \
    http://localhost:5001/auth/register

    curl \
    --request POST \
    --data "username=usere&password=password&email=useree%40email.com&nickname=Matthew" \
    http://localhost:5001/auth/register


#### Updating User 1 ####
#### Login ####
echo "Sleeping for 3 seconds before updating users"
sleep 3
echo "Shookt! Inserting character users";
        curl \
        --request POST \
        --data "username=user1&password=password" \
        http://localhost:5001/auth/login

#### USER 1 ####
echo "Editing user1"
#### Editing User Profile ####
echo "user1: Shookt! Editing Profile";
    curl \
    --request PUT \
    --data "username=user1&password=password" \
    http://localhost:5001/api/profile
sleep 0.5

#### Editing User Preferences ####
echo "user1: Shookt! Inserting Utilities";
    curl \
    --request PUT \
    --data "username=user1&password=password" \
    http://localhost:5001/api/preferences/utilities
sleep 0.5

echo "user1: Shookt! Inserting When";
    curl \
    --request PUT \
    --data "username=user1&password=password" \
    http://localhost:5001/api/preferences/when
sleep 0.5

echo "user1: Shookt! Inserting Cost";
    curl \
    --request PUT \
    --data "username=user1&password=password" \
    http://localhost:5001/api/preferences/cost
sleep 0.5

echo "user1: Shookt! Inserting Sex";
    curl \
    --request PUT \
    --data "username=user1&password=password" \
    http://localhost:5001/api/preferences/sex
sleep 0.5

echo "user1: Shookt! Inserting Misc";
    curl \
    --request PUT \
    --data "username=user1&password=password" \
    http://localhost:5001/api/preferences/misc
sleep 0.5


echo "user1: Shookt! Inserting Location";
    curl \
    --request PUT \
    --data "username=user1&password=password" \
    http://localhost:5001/api/preferences/location
sleep 0.5


echo "user1: Shookt! Inserting Lifestyle";
    curl \
    --request PUT \
    --data "username=user1&password=password" \
    http://localhost:5001/api/preferences/lifestyle
sleep 0.5

echo "user1: Fnished! Logging out!";
#### Logout ####

    curl \
    --request POST \
    --data "username=user1&password=password" \
    http://localhost:5001/auth/logout
echo "user1: Fnished!";
sleep 0.5

