#### Account Creation ####

printf "Starting to create number users"
    curl \
    --request POST \
    --data "username=user1&password=password&email=user1%40email.com&nickname=Matthew" \
    http://localhost:5001/auth/register

sleep 1

#### Login ####
printf "Logging In!\n"
    curl \
    --request POST \
    --cookie-jar ./cookies \
    --data "username=user1&password=password" \
    http://localhost:5001/auth/login
printf "\nFinished Loggin In!\n"

sleep 2
#### UPDATING USER ####
printf "\bEditing user1\n"
#### Editing User Profile ####
printf "\nuser1: Shookt! Editing Profile\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "fullName=Matthew%20Macos&status=I%20am%20looking%20for%20a%20room&cleanliness=5&sex=Male&smoker=No&hasOrg=No&gender=Yugoslavian%20Apache%20Helicopter&course=BS%20Computer%20Science&batch=2017&birthday=%7B%25%20now%20'ISO-8601'%20%25%7D&contactNumber=09123456789&bio=Friedrich%20Wilhelm%20Nietzsche%20was%20a%20German%20philosopher,%20cultural%20critic,%20poet,%20philologist,%20and%20Latin%20and%20Greek%20scholar%20whose%20work%20has%20exerted%20a%20profound%20influence%20on%20Western%20philosophy%20and%20modern%20intellectual%20history.asdasd&nickname=matthew&email=matthewmarcos94%40gmail.com" \
    http://localhost:5001/api/profile
sleep 0.5

#### Editing User Preferences ####
printf "\nuser1: Shookt! Inserting Utilities\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "airconditioning=No&laundry=No&cooking=No&gasStove=No&electricStove=No&microwave=No&waterKettle=No&internet=No&torrent=No&speedRequirement=0" \
    http://localhost:5001/api/preferences/utilities
sleep 0.5

printf "\nuser1: Shookt! Inserting When\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "duration=End%20of%20semester&startDate=2014-04-27" \
    http://localhost:5001/api/preferences/when
sleep 0.5

printf "\nuser1: Shookt! Inserting Cost\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "rentPriceRangeStart=1500&rentPriceRangeEnd=3500&shouldIncludeUtilities=No&utilitiesPriceRangeStart=0&utilitiesPriceRangeEnd=1500" \
    http://localhost:5001/api/preferences/cost
sleep 0.5

printf "\nuser1: Shookt! Inserting Sex\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "sex=Male" \
    http://localhost:5001/api/preferences/sex
sleep 0.5

printf "\nuser1: Shookt! Inserting Misc\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "curfew=No&curfewTime=21:30:00&message=Some%20asdasdrandom%20message%20here%20makes%20these%20things%20awesome" \
    http://localhost:5001/api/preferences/misc
sleep 0.5


printf "\nuser1: Shookt! Inserting Location\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "nearbyRestaurants=Yes&travelTimeToUplb=1&generalLocation=Demarces" \
    http://localhost:5001/api/preferences/location
sleep 0.5


printf "\nuser1: Shookt! Inserting Lifestyle\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "alcohol=No&cleanliness=10&smokers=No&studyTime=Morning&guestsInRoom=Yes&guestsStudyArea=Yes&pets=Do%20not%20care&org=Do%20not%20care" \
    http://localhost:5001/api/preferences/lifestyle
sleep 0.5

printf "\nuser1: Fnished! Logging out!\n";

#### Logout ####
    curl \
    --request POST \
    --cookie ./cookies \
    http://localhost:5001/auth/logout
printf "\nuser1: Fnished!\n\n";
sleep 0.5

