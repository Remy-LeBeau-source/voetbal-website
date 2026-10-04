# language: nl
Functionaliteit: Inloggen en uitloggen
  Als bezoeker van de voetbalwebsite
  wil ik kunnen inloggen en uitloggen
  zodat de website weet wie ik ben

  Achtergrond:
    Gegeven ik ben op de voetbalwebsite

  Scenario: Inloggen met de testgebruiker
    Als ik inlog met gebruikersnaam "testuser" en wachtwoord "Voetbal123!"
    Dan ben ik ingelogd als "testuser"
    En zie ik de knop "Uitloggen"

  Scenario: Uitloggen
    Gegeven ik ben ingelogd met gebruikersnaam "testuser" en wachtwoord "Voetbal123!"
    Als ik uitlog
    Dan ben ik uitgelogd
    En zie ik de knop "Inloggen"

  Scenario: Inloggen met een verkeerd wachtwoord
    Als ik inlog met gebruikersnaam "testuser" en wachtwoord "fout-wachtwoord"
    Dan zie ik de foutmelding "Gebruikersnaam of wachtwoord klopt niet."
    En ben ik uitgelogd

  Scenario: Ingelogd blijven na het verversen van de pagina
    Gegeven ik ben ingelogd met gebruikersnaam "testuser" en wachtwoord "Voetbal123!"
    Als ik de pagina ververs
    Dan ben ik ingelogd als "testuser"
