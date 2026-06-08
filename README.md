# Vene keele teadmiste testimise platvorm

Veebipõhine platvorm õpilaste vene keele oskuse testimiseks.

## Projekti kirjeldus

Rakendus võimaldab õpetajal luua vene keele teste ning õpilastel neid läbida. Süsteem toetab kasutajate registreerimist, testide loomist, tulemuste salvestamist, märkmete haldamist, küsimuste esitamist õpetajale ning uudiste avaldamist.

## Kasutatud tehnoloogiad

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express

### Andmebaas

* MySQL

### Muud tööriistad

* Git
* GitHub
* Visual Studio Code
* XAMPP

## Projekti käivitamine

### 1. Laadi projekt GitHubist

```bash
git clone https://github.com/ViktoriaLoiko/russian-language-testing-platform.git
```

### 2. Paigalda vajalikud paketid

Mine kausta `backend` ja käivita:

```bash
npm install
```

### 3. Loo MySQL andmebaas

Loo uus andmebaas ning impordi SQL-fail, mis asub kaustas:

```text
database/
```

### 4. Seadista andmebaasi ühendus

Kontrolli andmebaasi ühenduse seadeid failis:

```text
backend/config/db.js
```

### 5. Käivita server

Mine kausta `backend` ja käivita:

```bash
node index.js
```

Pärast käivitamist on server kättesaadav aadressil:

```text
http://localhost:3000
```

## Rakenduse funktsioonid

### Õpilane

* registreerimine ja sisselogimine;
* testide läbimine;
* tulemuste vaatamine;
* märkmete loomine ja kustutamine;
* küsimuste esitamine õpetajale.

### Õpetaja

* testide loomine;
* tulemuste vaatamine;
* küsimustele vastamine;
* uudiste avaldamine;
* testide haldamine.

## Andmebaasi struktuur

Projekt kasutab järgmisi põhitabeleid:

* users
* tests
* results
* questions
* notes
* news

## Autor

Viktoria Loiko

Ida-Virumaa Kutsehariduskeskus

Noorem Tarkvaraarendaja
