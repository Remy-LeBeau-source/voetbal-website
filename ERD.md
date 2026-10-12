# ERD – Voetbal-website

De website heeft geen database. Alle gegevens staan in de browser (`localStorage`) of als vaste lijst in [index.html](index.html). Dit diagram laat zien welke gegevens er zijn en hoe ze bij elkaar horen.

```mermaid
erDiagram
    BROWSER ||--o| SESSIE : "onthoudt"
    GEBRUIKER ||--o{ SESSIE : "is ingelogd in"
    BROWSER ||--|| GELUIDSINSTELLING : "heeft"
    GELUIDSINSTELLING ||--o{ GELUIDKEUZE : "bevat"
    BROWSER ||--o| APP_POPUP : "onthoudt"
    BROWSER ||--o{ RECORD : "bewaart"
    BROWSER ||--o{ NIVEAUKEUZE : "bewaart"
    SPEL ||--o{ NIVEAU : "heeft"
    SPEL ||--o{ RECORD : "heeft"
    SPEL ||--o| NIVEAUKEUZE : "heeft"
    NIVEAU |o--o{ RECORD : "geldt voor"
    NIVEAU ||--o{ NIVEAUKEUZE : "is gekozen in"

    BROWSER {
        string localStorage PK "één opslag per browser en apparaat"
    }

    GEBRUIKER {
        string naam PK "bijv. testuser"
        string wachtwoord "vaste lijst GEBRUIKERS in de pagina"
    }

    SESSIE {
        string sleutel PK "ingelogd"
        string naam FK "naam van de ingelogde gebruiker"
    }

    GELUIDSINSTELLING {
        boolean geluid "sleutel geluid, standaard aan"
        number volume "sleutel volume, standaard 1"
    }

    GELUIDKEUZE {
        string geluidnaam PK "veld in het object onder sleutel geluiden"
        boolean aan
    }

    APP_POPUP {
        string sleutel PK "app-popup-weg"
        number tijdstip "moment waarop de popup is weggeklikt"
    }

    SPEL {
        string id PK "sectie-id, bijv. spel, redden, memory"
        string titel "bijv. Penaltyserie"
    }

    NIVEAU {
        string spel_id PK, FK
        string naam PK "makkelijk, normaal of moeilijk"
    }

    NIVEAUKEUZE {
        string sleutel PK "bijv. keeper-niveau"
        string spel_id FK
        string niveau FK "standaard normaal"
    }

    RECORD {
        string sleutel PK "bijv. keeper-record-moeilijk"
        string spel_id FK
        string niveau FK "leeg als het spel geen niveaus heeft"
        string variant "alleen penalty: gewoon of panenka"
        number waarde "score, tijd in seconden of aantal beurten"
    }
```

## Welke sleutels horen bij welk spel

| Spel (sectie-id) | Niveaukeuze | Records | Waarde |
| --- | --- | --- | --- |
| Penaltyserie (`spel`) | – | `penalty-record`, `panenka-record` | score, hoger is beter |
| Hooghouden (`hooghouden`) | – | `hooghouden-record` | score, hoger is beter |
| Overkoppen (`koppen`) | – | `overkoppen-record` | score, hoger is beter |
| Omhaal-uitdaging (`omhaal`) | – | `omhaal-record` | score, hoger is beter |
| Jij bent de keeper (`redden`) | `keeper-niveau` | `keeper-record-makkelijk`, `keeper-record`, `keeper-record-moeilijk` | score, hoger is beter |
| Eén tegen één (`eentegeneen`) | `ee-niveau` | – | – |
| Vrije trap (`vrijetrap`) | – | `vrijetrap-record` | score, hoger is beter |
| Dribbelparcours (`dribbel`) | `dribbel-niveau` | `dribbel-record-makkelijk`, `dribbel-record`, `dribbel-record-moeilijk` | tijd in seconden, lager is beter |
| Schietwand (`schietwand`) | – | `schietwand-record` | score, hoger is beter |
| Voetbal-memory (`memory`) | `memory-niveau` | `memory-record-makkelijk`, `memory-record-normaal`, `memory-record-moeilijk` | aantal beurten, lager is beter |
| Dribbelrun (`dribbelrun`) | – | `dribbelrun-record` | score, hoger is beter |
| Vier op een rij (`vier`) | – | – | – |
| De Blockers (`blockers`) | – | `blockers-record` | score, hoger is beter |

## Goed om te weten

- Records, niveaus en geluidsinstellingen horen bij de **browser**, niet bij de gebruiker. Wie inlogt als een andere gebruiker ziet dezelfde records.
- De gebruikers staan als vaste lijst in de pagina; er is geen tabel waarin je gebruikers kunt toevoegen.
- De sessie is één waarde (`ingelogd`): er kan per browser maar één gebruiker tegelijk ingelogd zijn.
