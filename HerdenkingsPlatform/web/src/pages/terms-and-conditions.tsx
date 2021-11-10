import { Button, Switch } from "@material-ui/core";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { CookiePreferences } from "../components/Cookies/CookiePreferences";
import { Layout } from "../components/general/Layout";
import Footer from "../components/landing_page/footer";
import { Layout_LP } from "../components/landing_page/Layout_LP";
import Navbar_LP from "../components/landing_page/Navbar_LP";
import { WithApollo } from "../utils/withApollo";

interface TermsAndConditionsProps {}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({}) => {

  
  return (
    <>
        <Navbar_LP PaginaData={null} share_btn={false} />
        <div className="privacy_policy_container">


        <div className="privacy_policy_title" >Algemene Voorwaarden </div>




        

        <div className="privacy_policy_text" >
        Versie van toepassing 01/07/2021.

        {/* Aeterna heeft het recht om de informatie op en werkingswijze van deze Website op elk moment te wijzigen en de Voorwaarden op ieder moment eenzijdig en zonder voorafgaande aankondiging aan te passen. U wordt van de aangepaste Voorwaarden op de hoogte gebracht via publicatie op de Website, en deze zullen automatisch van kracht worden na bekendmaking.  */}
        <br/>
        Tenzij de veranderingen wettelijk verplicht zijn, informeert Aerterna U (bijvoorbeeld per e-mail of via onze Website) ten minste 30 dagen voordat we wijzigingen aanbrengen in deze Voorwaarden en geven we U de kans om de wijzigingen te bekijken voordat ze in werking treden. Zodra de bijgewerkte Voorwaarden in werking zijn getreden, bent U aan deze Voorwaarden gebonden indien U onze website blijft gebruiken.
        
        </div>

        <div className="privacy_policy_subtitle" > <b>ARTIKEL I: Definities </b> </div>

        <div className="privacy_policy_text" >
        1. Aeterna: Willem Himpe eenmanszaak met ondernemingsnummer 0713.410.353, gevestigd te Antoon Viaenestraat 8, 8200 Brugge. Contact kan via email op het adres info@aeterna.be. <br/>
        2. Website: De website waar Aeterna de mogelijkheid tot oprichting of Beheer van een Levenstijdlijn aanbiedt, en welke bereikbaar is op https://aeterna.be. <br/>
        3. Levenstijdlijn: de Beheerder maakt op de Website een online Levenstijdlijn aan waar de Beheerder en Bezoekers herinneringen zoals foto’s, video’s, tekst- of spraakberichten en muziek kunnen toevoegen voor het verzamelen van levensgebeurtenissen of ter nagedachtenis van een overledene. <br/>
        4. Beheerder: elke natuurlijke of rechtspersoon die gebruik maakt van de Website van Aeterna om een Levenstijdlijn op te richten en te beheren. <br/>
        5. Bezoeker: eenieder die de Website bezoekt of bekijkt en desgevallend de mogelijkheid krijgt om na goedkeuring door de Beheerder de Levenstijdlijn te beheren.  <br/>
        6. Beheer: het inrichten en bewerken van een Levenstijdlijn door middel van het toevoegen en plaatsen van foto’s, video’s, tekst- of spraakberichten en muziek, door de Beheerder of Bezoeker op de Website. <br/>
        7. Intellectuele Eigendomsrechten: Het recht op afbeelding, auteursrechten en naburige rechten, sui generis rechten op databanken, (al dan niet geregistreerde) merken, handelsnamen en domeinnamen<br/>
        </div>

        <div className="privacy_policy_subtitle" > <b>ARTIKEL II: Gebruik </b> </div>

          <div className="privacy_policy_text" >
          <b>2.1 Registratie</b>
          <br/>
          De toegang tot de algemeen toegankelijke delen van de Website is vrij van registratie.
          Opdat de Beheerder en de Bezoeker gebruik kunnen maken van, en een bijdrage kunnen leveren tot de Levenstijdlijn op de Website, is er een geregistreerd account vereist. Registratie vereist een email en een zelfgekozen paswoord. 
          Opdat de Bezoeker de mogelijkheid zou verkrijgen om een Levenstijdlijn te beheren met goedkeuring van de Beheerder, dient deze zich te registreren. Registratie vereist een email en een zelfgekozen paswoord.
          Aanvaarding van deze Voorwaarden door de Bezoeker en de Beheerder gebeurt bij de registratie op de Website, via het aanvinken van het vakje ‘ik ga akkoord met de Voorwaarden’.
          <br/>
        <br/>
        <b>2.2 Gebruiksregels </b>
        <br/>
        De Beheerder en de Bezoeker verbinden zich ertoe om de informatie weergegeven op de Website uitsluitend voor privédoeleinden te gebruiken. Elk commercieel gebruik, zoals het plaatsen van promotioneel of publicitair materiaal, is verboden.        <br/>
        <br/>
        Bij het bezoeken en beheren van de Website is het de Beheerder, noch de Bezoeker toegestaan om:     
        <br/>
        
              1.	Onjuiste gegevens mee te delen, zowel van overleden als nog in leven zijnde personen. Een Levenstijdlijn oprichten met betrekking tot een nog in leven zijnde persoon is in strijd met deze bepaling;
              <br/>
              2.	Persoonlijke gegevens van derden (zoals e-mailadressen, foto’s, video’s of andere informatie) die te consulteren zijn op de Website, te kopiëren, te bewerken of verder te verspreiden voor andere doeleinden dan de oprichting of het beheer van een Levenstijdlijn;          
              <br/>
              3.	Schokkende of aanstootgevende foto’s, video’s of teksten te plaatsen. Hieronder wordt onder andere begrepen naaktfoto’s, foto’s van lijken (met uitzondering van openbaringen) of ernstig gewonde mensen of dieren of andere onzedelijke afbeeldingen. Aeterna behoudt zich het recht voor om naar haar oordeel ongepaste inhoud te verwijderen; 
              <br/>
              4.	Virussen, wormen of andere schadelijke technologieën te plaatsen, zij het direct of indirect, die de Website kunnen beschadigen, ontoegankelijk kunnen maken, of op enig andere wijze Aeterna of anderen kunnen schaden;
              <br/>
              5.	Het gebruik van geautomatiseerde systemen of software om gegevens aan de Website te onttrekken voor commerciële doeleinden is verboden.
              <br/>
              6.	De Website zodanig te belasten dat de werking in gedrang komt;

              <br/>
              7.	Ervoor te zorgen dat de Website beperkt of volledig ontoegankelijk wordt.
              <br/>
              8.  De volgende bij wet verboden daden te stellen:   <br/>
                  8.1) Xenofobe, racistische, discriminerende uitlatingen te plaatsen of te promoten  
                  8.2) Laster, eerroof, spam, beledigingen, bedreigingen, misbruik van de naam of de beeltenis, misbruik van vertrouwen;  
                  8.3) Openbare zedenschennis, publiceren van pornografische afbeeldingen, pedofilie; 
                  8.4) Schending van intellectuele of andere eigendommen;
                  8.5) Terrorisme of het aanzetten tot terrorisme.
              <br/>
              Aeterna stelt de bevoegde gerechtelijke of administratieve autoriteiten onverwijld in kennis van vermeende onwettige activiteiten of onwettige informatie die door de Beheerders of Bezoekers van hun Levenstijdlijn worden geleverd. 
            <br/>
            <br/>
            <b>2.3 Misbruik </b><br/>
            Aeterna behoudt zich het recht voor om eenieder die de Voorwaarden, met in het bijzonder de Gebruiksregels en de regels vervat in artikel VI miskent, de toegang tot de Website tijdelijk of definitief, geheel of gedeeltelijk te ontzeggen.            
            <br/>
            Aeterna behoudt zich het recht voor om reacties te weren of te verwijderen indien ze kwetsend van aard, of in strijd zijn met de regels vervat in artikel II. Deze beslissing is de autonome bevoegdheid van Aeterna, die haar beslissing niet moet verantwoorden.
            <br/>
            Eenieder die de Voorwaarden miskent wordt het recht ontnomen op enige terugbetaling van de door hem/haar reeds betaalde prijs.

        </div>


       
        <div className="privacy_policy_subtitle" > <b>ARTIKEL III: Minderjarigen </b> </div>        
          <div className="privacy_policy_text" >
              Om van de Website gebruik te kunnen maken, moet U minstens 13 jaar oud zijn. Als U geen 13 jaar bent, vraagt Aeterna U om uw handelingen door uw ouders of wettelijke voogd te laten bevestigen en vooraf de toestemming van uw ouders, voogd of wettelijke vertegenwoordigers te hebben. Aeterna behoudt zich het recht voor om U als Bezoeker of als Beheerder te weigeren indien Aeterna vermoedt dat U minderjarig bent. 
              <br/>
              Aeterna vraagt de minderjarige Bezoeker of Beheerder die persoonlijke gegevens meedelen, om eerst de privacyverklaring te lezen en te bespreken met hun ouders, voogd of wettelijke vertegenwoordigers.
          </div>



        <div className="privacy_policy_subtitle" > <b>ARTIKEL IV: De Overeenkomst </b> </div>


                <div className="privacy_policy_text" > <b>4.1 Totstandkoming en duur  </b><br/>

                Tussen de Beheerder en Aeterna komt in het geval van het gratis basispakket een overeenkomst voor onbepaalde duur tot stand. Deze overeenkomst blijft duren tot op het moment dat Aeterna of de Beheerder deze opzegt. De duur van de overeenkomst neemt aanvang vanaf het moment dat de aanvraag tot Beheer van een Levenstijdlijn elektronisch werd bevestigd.          Indien de Beheerder besluit, op basis van de op de Website ter beschikking gestelde pakketten, om een Levenstijdlijn voor een vaste periode te beheren, dan wordt met Aeterna een overeenkomst voor bepaalde duur gesloten, waarbij de duur bepaald wordt door de Beheerder op basis van het gekozen pakket. 
                <br/>
                Indien de Beheerder besluit, op basis van de op de Website ter beschikking gestelde pakketten, om een Levenstijdlijn voor een vaste periode te beheren, dan wordt met Aeterna een overeenkomst voor bepaalde duur gesloten, waarbij de duur bepaald wordt door de Beheerder op basis van het gekozen pakket. De duur van de overeenkomst neemt aanvang vanaf het moment dat de aanvraag tot Beheer van een Levenstijdlijn elektronisch werd bevestigd. De overeenkomst eindigt bij afloop van de termijn indien de overeenkomst tijdig werd opgezegd.
                <br/>
                De Bezoeker, die door de Beheerder gemachtigd werd wijzigingen aan te brengen aan een Levenstijdlijn, sluit met Aeterna een overeenkomst van onbepaalde duur, die aanvang neemt van zodra de Beheerder de machtiging tot het wijzigen van een Levenstijdlijn aan de Bezoeker verleent.        </div> 
                <br/>

                <div className="privacy_policy_text" > <b>4.2 Herroepingstermijn  </b><br/>
                Op de overeenkomst gesloten tussen Aeterna en de Beheerder is een herroepingstermijn van 14 kalenderdagen van toepassing. De herroepingstermijn neemt aanvang de dag na het sluiten van de overeenkomst. Om het herroepingsrecht uit te oefenen kan de beheerder een email met verzoek tot herroeping sturen naar info@aeterna.be                
                <br/>
                Indien de Beheerder uitdrukkelijk instemde met de uitvoering van de overeenkomst tijdens de loop van de herroepingstermijn en de Beheerder de overeenkomst tijdig herroept, behoudt Aeterna zich het recht voor om de Beheerder een vergoeding aan te rekenen voor de diensten geleverd tussen de dag na het sluiten van de overeenkomst en de dag van het uitoefenen van het herroepingsrecht (start- en einddata zijn inbegrepen). Deze vergoeding wordt per dag berekend, naar rato van de totale prijs van de overeenkomst.                   Aeterna behoudt zich het recht voor om de Beheerder een vergoeding aan te rekenen voor de diensten geleverd tussen de dag na het sluiten van de overeenkomst en de dag van het uitoefenen van het herroepingsrecht (start- en einddata zijn inbegrepen). Deze vergoeding wordt per dag berekend, naar rato van de totale prijs van de overeenkomst.           </div>
                <br/>
                In afwijking daarvan, geldt een afzonderlijke en een apart te betalen prijs voor de diensten die bij de aanvang van de uitvoering van de overeenkomst door Aeterna volledig worden verstrekt. De overeenkomst specifieert uitdrukkelijk de diensten die meteen bij aanvang van de uitvoering van de overeenkomst volledig worden verstrekt. 
                <br/>
                De regeling van de vergoeding voor diensten geleverd tijdens de herroepingstermijn is niet van toepassing indien de Beheerder opteerde voor het gratis basispakket. 
                <br/>
                Op de overeenkomst gesloten tussen Aeterna en de Bezoeker is een herroepingstermijn van 14 kalenderdagen van toepassing. De herroepingstermijn neemt aanvang de dag na het sluiten van de overeenkomst. Om het herroepingsrecht uit te oefenen kan de beheerder een email met verzoek tot herroeping sturen naar info@aeterna.be             
                <br/>
                De regeling van de vergoeding voor diensten geleverd tijdens de herroepingstermijn is niet van toepassing op de overeenkomst tussen Aeterna en de Bezoeker.
                <br/>


                <div className="privacy_policy_text" > <b>4.3 Opzeg  </b><br/>
                Aeterna behoudt zich het recht voor om de overeenkomst onmiddellijk eenzijdig op te zeggen indien de Beheerder handelt in strijd met de Voorwaarden of indien de prijs voor het Beheer van de Levenstijdlijn niet tijdig betaald wordt overeenkomstig artikel V.
                <br/>
                Ingeval de Beheerder opteert voor een overeenkomst van bepaalde duur, dient hij ten laatste 30 dagen voor afloop van de termijn bepaald in het pakket de overeenkomst op te zeggen door middel van een mail naar info@aeterna.be; indien hij dit niet doet, dan wordt de overeenkomst automatisch stilzwijgend verlengd voor een periode van 1 jaar die aanvang neemt de dag na afloop van de vorige termijn.
                <br/>
                Ingeval de Beheerder opteert voor het gratis basispakket, waarbij een overeenkomst van onbepaalde duur ontstaat, dan kan de Beheerder de overeenkomst op eender welk moment opzeggen.
                <br/>
                De Beheerder heeft daarnaast in ieder geval het recht de overeenkomst eenzijdig op te zeggen in het geval dat hij zich in een situatie van overmacht bevindt, alsmede in het geval Aeterna haar verbintenissen niet nakomt. Opzegging gebeurt steeds schriftelijk op een elektronische drager.
                Wanneer Aeterna, in het geval dat de Beheerder diens eigen Levenstijdlijn heeft opgemaakt, op eender welke wijze geïnformeerd wordt over het overlijden van die Beheerder, stuurt zij aan alle Bezoekers die bij de Levenstijdlijn de machtiging hebben gekregen om wijzigingen aan te brengen, een bericht met de mededeling van de mogelijkheid om het Beheer van de pagina over te nemen. Indien geen antwoord wordt gegeven binnen een termijn van 30 dagen, of indien er geen Bezoekers met machtiging zijn, behoudt Aeterna zich het recht voor om de overeenkomst onmiddellijk eenzijdig op te zeggen.
                <br/>
                Indien een Bezoeker het Beheer van de Levenstijdlijn wenst over te nemen, dan gaat hij/zij akkoord met deze Voorwaarden en wordt hij/zij gezien als Beheerder volgens deze Voorwaarden.
                </div>


                <div className="privacy_policy_text" > <b>4.4 Einde van de overeenkomst  </b><br/>
                  Bij het einde van de overeenkomst wordt op vraag van de Beheerder de Levenstijdlijn verwijderd. Indien de Beheerder niet vraagt om de Levenstijdlijn te verwijderen, dan wordt zij bij het einde van de overeenkomst verborgen voor Bezoekers tot wanneer de Beheerder besluit om opnieuw een overeenkomst met Aeterna aan te gaan. Indien de Beheerder niet verkiest om een nieuwe overeenkomst aan te gaan binnen de 30 dagen na het einde van de vorige overeenkomst, dan wordt de Levenstijdlijn door Aeterna verwijderd.
                  <br/>
                  Wanneer, bij een overeenkomst van bepaalde duur, tijdig opzeg gedaan wordt of indien de prijs voor de verlenging niet tijdig voldaan wordt volgens de bepalingen van deze Voorwaarden, dan zal bij het einde van de overeenkomst van bepaalde duur automatisch overgeschakeld worden naar het gratis basispakket indien dit pakket niet de limieten van dit gratis basispakket overschrijdt. Indien dit wel het geval is wordt de pagina onbeschikbaar gemaakt en krijgt de beheerder een maand de kans het abonnement te verlengen of aan de limieten van het gratis basis pakket te voldoen. Na deze maand kan Aeterna eenzijdig de levenstijdlijn verwijderen.
                </div>



        <div className="privacy_policy_subtitle" > <b>ARTIKEL V: Prijzen en Betaling  </b> </div>

          <div className="privacy_policy_text" >
          De oprichting en het Beheer van een basispakket zijn gratis.
          <br/> 
          De tarieven voor de overige pakketten, inclusief de mogelijkheid om buiten de termijnen bepaald in de pakketten een Levenstijdlijn te beheren, staan op de Website vermeld. Alle prijzen zijn inclusief BTW, tenzij dit op de Website uitdrukkelijk anders wordt bepaald. De prijs voor de volledige periode van het Beheer wordt op het moment van het sluiten van de overeenkomst in haar volledigheid voldaan. De bepalingen van artikel 4.2 blijven onverkort van toepassing.          <br/>
          <br/>
          De betaling gebeurt op de op de Website aangegeven wijze. Aeterna maakt voor de transacties gebruik van tussenpersoon, Mollie B.V.. Voor de Voorwaarden die op deze transacties van toepassing zijn, dienen Beheerders zich te wenden tot de Gebruiksovereenkomst van Mollie B.V.. Aeterna is niet verantwoordelijk voor enige storing tijdens de betaling.
        </div>

        <div className="privacy_policy_subtitle" > <b> ARTIKEL VI: Intellectuele Eigendom   </b> </div>


        <div className="privacy_policy_subtitle" > <b>6.1 Door Aeterna geplaatst   </b> </div>

        <div className="privacy_policy_text" >
        Aeterna is exclusief houder van de intellectuele eigendomsrechten op de Website. Alle teksten, foto’s, tekeningen, grafieken, beeld, geluid, data, databanken, software, benamingen, handels- en domeinnamen zijn auteursrechtelijk beschermde werken, en mogelijk zijn zij ook anders beschermd.  
        <br/>
        De Beheerder en de Bezoeker erkennen uitdrukkelijk dat alle betreffende eigendomsrechten, inclusief Intellectuele Eigendomsrechten, toebehoren aan Aeterna. De Beheerder verkrijgt uitsluitend gebruiksrechten tijdens de duur van de overeenkomst. Het gebruiksrecht is niet-exclusief en overdraagbaar.          
        <br />
        Het is verboden om, zonder voorafgaand schriftelijk akkoord van Aeterna, informatie van de Website geheel of gedeeltelijk op te slaan (anders dan noodzakelijk om de Website te gebruiken), te reproduceren, te wijzigen, openbaar te maken, te distribueren of te verkopen.
        <br/>
        Hyperlinks van deze Website op websites van derden zijn toegelaten, tenzij voor commerciële doeleinden, mits duidelijke vermelding van de bron van de Website van Aeterna en met hyperlink verwijzend naar de originele inhoud op de Website.
        <br/>
        Hyperlinks op deze Website naar websites of naar webpagina's van derden, of andere verwijzingen naar informatie van andere organisaties zijn toegelaten. Aeterna heeft geen zeggenschap over de inhoud of andere kenmerken van deze websites, webpagina's en informatie van derden en is in geen geval aansprakelijk voor de inhoud of kenmerken ervan.
        </div>

        <div className="privacy_policy_subtitle" > <b>6.2 Door de Beheerder of Bezoeker geplaatst    </b> </div>

        <div className="privacy_policy_text" >
        Aeterna verkrijgt op geen enkel ogenblik de Intellectuele Eigendom over de foto’s, video’s, logo’s, muziek en andere gelijksoortige media die door de Beheerders of de Bezoekers op de Website worden geplaatst. Aeterna verkrijgt een gebruiksrecht op de geplaatste foto’s, video’s, logo’s, muziek en andere gelijksoortige media die door de Beheerders of de Bezoekers op de website worden geplaatst. De Beheerder, desgevallend de Bezoeker, die de inhoud heeft geplaatst, staat in voor enige schending van de Intellectuele Eigendomsrechten van derden die door dit gebruiksrecht zouden ontstaan.
        <br/> 
        Gegevens, zoals teksten, foto’s, video’s en muziek, die door de Beheerder of Bezoeker op een Levenstijdlijn zijn geplaatst, dienen in regel te zijn met de geldende wetten op het auteursrecht en de overige Intellectuele Eigendomsrechten. Aeterna is niet aansprakelijk voor schendingen van Intellectuele Eigendomsrechten van derden, ontstaan door het beheren van een Levenstijdlijn door een Beheerder of Bezoeker. De Beheerder en Bezoeker dienen zelf te onderzoeken of deze gegevens geen schending van de rechten van derden uitmaken.        
        <br/> 
        Indien derden van mening zouden zijn dat de op de Website geplaatste media zoals foto’s, video’s, logo’s of muziek hun Intellectuele Eigendomsrechten – waaronder het auteursrecht – schenden, kunnen zij via email, op het adres info@aeterna.be, een gemotiveerd (met het nodige bewijs van hun rechten) verzoek tot verwijdering sturen aan Aeterna. Indien Aeterna van oordeel is dat er inderdaad een inbreuk gepleegd werd, zal Aeterna overgaan tot het verwijderen van de geviseerde inhoud.        <br/>
        </div>


        <div className="privacy_policy_subtitle" > <b>ARTIKEL VII: Overdracht   </b> </div>

        <div className="privacy_policy_text" >
        De Beheerder is gerechtigd zijn rechten en verplichtingen uit hoofde van deze Voorwaarden en/of de overeenkomst met Aeterna geheel of gedeeltelijk over te dragen aan derden, of derden aan te stellen als bijkomende contractspartij. Met betrekking tot de overdracht of een bijkomende contractpartij van de betalingsverplichting moet de Beheerder Aeterna schriftelijk in kennis stellen via email over deze aanpassing. Deze overdracht of aanstelling zal pas rechtsgeldig tot stand komen indien Aeterna op de hoogte is van deze aanpassing en de schriftelijke toestemming via email aan zowel de Beheerder als de derde meedeelt. De derde zal in diezelfde email de Voorwaarden accepteren.  
        </div>



        <div className="privacy_policy_subtitle" > <b>ARTIKEL VIII: Aansprakelijkheid   </b> </div>

        <div className="privacy_policy_text" >
        Aeterna zal de diensten leveren naar best vermogen. Behoudens een uitdrukkelijk andersluidende bepaling gaat Aeterna geen resultaatsverbintenis aan.      
        <br/> 
        Aeterna sluit alle aansprakelijkheid uit voor enigerlei directe of indirecte schade, van welke aard dan ook, die voortvloeit uit of in enig opzicht verband houdt met (het gebruik van) de Website. Aeterna is tevens niet aansprakelijk voor schade ontstaan door onbeschikbaarheid en/of onbereikbaarheid van de Website en het gebruiken van de Website.
        <br/> 
        Aeterna is niet verantwoordelijk voor de inrichting van Levenstijdlijnen, noch voor de (lege) inhoud, zoals foto’s, video’s, berichten en muziek, die op de Website door Beheerders of Bezoekers wordt geplaatst. Aeterna biedt zelf geen enkele garantie ten aanzien van de juistheid of rechtmatigheid daarvan. De juistheid en rechtmatigheid van het Beheer vormt de verantwoordelijkheid van de Beheerders en Bezoekers zelf. Ook biedt Aeterna geen garantie ten aanzien van het succes van de Levenstijdlijn.
        <br/> 
        Aeterna is op geen enkele wijze aansprakelijk voor de door een derde geleden schade naar aanleiding van de inhoud van een Levenstijdlijn, inclusief virussen of andere schadelijke programma’s of links, of de Levenstijdlijn zelf, maar blijft evenwel aansprakelijk voor haar opzet en haar grove schuld.
        
        
        </div>


        <div className="privacy_policy_subtitle" > <b>ARTIKEL IX: Overmacht    </b> </div>

        <div className="privacy_policy_text" >
        Als Overmacht wordt beschouwd elke vreemde oorzaak, waaronder bijvoorbeeld het in gebreke blijven van de Internetprovider, welke niet aan Aeterna verweten kan worden en die de nakoming van haar verbintenissen belet of in zo ernstige mate belemmert of bezwaarlijk maakt, dat die nakoming in redelijkheid niet van Aeterna kan worden gevergd. Tot die oorzaken behoren bijvoorbeeld: stroomstoring, uitval van internetverbindingen, storingen in de elektriciteitsvoorziening of communicatienetwerken of in de software van Aeterna en computervirussen.     
        <br/>
        Elke van de wil van Aeterna onafhankelijke omstandigheid waardoor de nakoming van zijn verplichtingen jegens de Beheerder of Bezoeker geheel of gedeeltelijk wordt verhinderd of waardoor de nakoming van zodanige verplichtingen in redelijkheid niet van Aeterna kan worden verlangd, ongeacht of die omstandigheid ten tijde van de overeenkomst te voorzien was, bevrijdt Aeterna van haar verbintenissen voor de duur van de hinder en voor hun draagwijdte, zonder recht op enige prijsvermindering of schadevergoeding voor de Beheerder, desgevallend de Bezoeker.
        </div>


        <div className="privacy_policy_subtitle" > <b>ARTIKEL X: Verwerking van persoonsgegevens     </b> </div>

        <div className="privacy_policy_text" >
        Voor de registratie op de Website dient de Beheerder dan wel de Bezoeker een email en een paswoord op te geven. Deze gegevens worden door Aeterna opgeslagen in een databank die door derden beheerd wordt. De overeenkomst gesloten tussen Aeterna en voornoemde derden met betrekking tot de verwerking door deze derden, bevat minstens dezelfde bepalingen als onderhavig artikel.
        <br/>
        Met betrekking tot de persoonsgegevens vermeldt in artikel IX heeft de derde-beheerder van de databank de hoedanigheid van verwerker, en heeft Aeterna de hoedanigheid van verwerkingsverantwoordelijke in de zin van de Algemene Verordening Gegevensbescherming. Aeterna verklaart de verplichtingen, die op de verwerkingsverantwoordelijke rusten, integraal na te leven en verbindt zich er uitdrukkelijk via een aparte verwerkingsovereenkomst tegenover de derde-verwerker toe de nodige stappen te ondernemen om de toepasselijke wetgeving na te leven. 
        <br/>
        Aeterna en eenieder die onder diens gezag staat en toegang heeft tot de persoonsgegevens, verwerkt de persoonsgegevens uitsluitend op basis van deze bepalingen.
        <br/>
        Aeterna verklaart afdoende technische en organisatorische beveiligingsmaatregelen te nemen teneinde de opgeslagen persoonsgegevens in het kader van de uitvoering van het contract te beschermen tegen verlies, hacking, vernietiging evenals elke andere vorm van illegale verwerking. 

        </div>    



        <div className="privacy_policy_subtitle" > <b>ARTIKEL XI: Nietigheid  </b> </div>

        <div className="privacy_policy_text" >      
        Voor zover een bepaling uit deze Voorwaarden naar het oordeel van de bevoegde rechtbank nietig is, zal enkel de geviseerde bepaling voor niet geschreven gehouden worden en laat dit de toepassing van de overige bepalingen onverlet. De nietige bepaling wordt vervangen door een andere bepaling die het doel en de strekking van de nietige bepaling zo dicht mogelijk benadert.       
        </div>    


        <div className="privacy_policy_subtitle" > <b>ARTIKEL XII: Deelbaarheid  </b> </div>
        <div className="privacy_policy_text" >      
        In geval van onrechtmatigheid of nietigheid van een of meerdere clausules in deze overeenkomst, zullen de overige clausules van de overeenkomst van kracht blijven.         
        </div>   



        <div className="privacy_policy_subtitle" > <b>ARTIKEL XIII: Toepasselijk recht en geschillenbeslechting  </b> </div>
        <div className="privacy_policy_text" >      
        Op de Website, op deze Voorwaarden en op alle daaruit voortvloeiende geschillen is uitsluitend het Belgische recht van toepassing.
        Alle geschillen omtrent de Website die ontstaan tussen de Beheerder of Bezoeker en Aeterna worden voorgelegd aan de bevoegde rechtbank in het Arrondissement West-Vlaanderen.
      </div>  

        <div className="privacy_policy_subtitle" > <b>ARTIKEL XIV: Overige   </b> </div>
        <div className="privacy_policy_text" >      
        Deze Voorwaarden vormen de volledige overeenkomst tussen U en Aeterna met betrekking tot het gebruik van onze Website. Deze Voorwaarden gaan voor op eventuele eerdere overeenkomsten.
        Indien U na het lezen van onze Algemene Verklaring nog vragen of opmerkingen heeft met betrekking tot de gebruiksvoorwaarden, kan U contact opnemen met Aeterna op dit nummer +32 478 43 65 79 of via het emailadres info@aeterna.be
        </div>   


        <Footer />

    
      </div>


    </>
  );
};

export default WithApollo({ ssr: false })(TermsAndConditions);
