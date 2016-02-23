

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `kurs`
--
CREATE DATABASE IF NOT EXISTS `kurs` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `kurs`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `activity`
--

CREATE TABLE IF NOT EXISTS `activity` (
`activityId` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `activityNumber` varchar(5) COLLATE utf8_bin NOT NULL,
  `title` varchar(50) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `beobachtung`
--

CREATE TABLE IF NOT EXISTS `beobachtung` (
`beobachtungId` int(11) NOT NULL,
  `participantId` int(11) NOT NULL,
  `leaderId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `activityId` int(11) DEFAULT NULL,
  `datetime` datetime DEFAULT NULL,
  `beobachtung` longtext COLLATE utf8_bin NOT NULL,
  `Credat` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `category`
--

CREATE TABLE IF NOT EXISTS `category` (
`categoryId` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `cssClass` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `leader`
--

CREATE TABLE IF NOT EXISTS `leader` (
`leaderID` int(11) NOT NULL,
  `prename` varchar(50) COLLATE utf8_bin NOT NULL,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `scoutname` varchar(50) COLLATE utf8_bin NOT NULL,
  `password` varchar(50) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `participant`
--

CREATE TABLE IF NOT EXISTS `participant` (
`participantId` int(11) NOT NULL,
  `prename` varchar(50) COLLATE utf8_bin NOT NULL,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `scoutname` varchar(50) COLLATE utf8_bin NOT NULL,
  `image` varchar(50) COLLATE utf8_bin NOT NULL,
  `sex` int(11) NOT NULL,
  `birthDate` date NOT NULL,
  `scoutGroup` varchar(255) COLLATE utf8_bin NOT NULL,
  `canton` varchar(5) COLLATE utf8_bin NOT NULL,
  `comment` text COLLATE utf8_bin NOT NULL,
  `experience` text COLLATE utf8_bin NOT NULL,
  `actualFunction` text COLLATE utf8_bin NOT NULL,
  `futurePlans` text COLLATE utf8_bin NOT NULL,
  `motivation` text COLLATE utf8_bin NOT NULL,
  `recommendation` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `postit`
--

CREATE TABLE IF NOT EXISTS `postit` (
`postit` smallint(6) NOT NULL,
  `Title` varchar(300) COLLATE utf8_bin NOT NULL,
  `Text` text COLLATE utf8_bin NOT NULL,
  `postitTypeId` int(11) NOT NULL,
  `participantId` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `postitType`
--

CREATE TABLE IF NOT EXISTS `postitType` (
`postitTypeId` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_bin NOT NULL,
  `faIcon` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `activity`
--
ALTER TABLE `activity`
 ADD PRIMARY KEY (`activityId`);

--
-- Indizes für die Tabelle `beobachtung`
--
ALTER TABLE `beobachtung`
 ADD PRIMARY KEY (`beobachtungId`), ADD KEY `activityId` (`activityId`), ADD KEY `leaderId` (`leaderId`), ADD KEY `participantId` (`participantId`), ADD KEY `categoryId` (`categoryId`);

--
-- Indizes für die Tabelle `category`
--
ALTER TABLE `category`
 ADD PRIMARY KEY (`categoryId`);

--
-- Indizes für die Tabelle `leader`
--
ALTER TABLE `leader`
 ADD PRIMARY KEY (`leaderID`);

--
-- Indizes für die Tabelle `participant`
--
ALTER TABLE `participant`
 ADD PRIMARY KEY (`participantId`);

--
-- Indizes für die Tabelle `postIt`
--
ALTER TABLE `postIt`
 ADD PRIMARY KEY (`postit`);

--
-- Indizes für die Tabelle `postitType`
--
ALTER TABLE `postitType`
 ADD PRIMARY KEY (`postitTypeId`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `activity`
--
ALTER TABLE `activity`
MODIFY `activityId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=113;
--
-- AUTO_INCREMENT für Tabelle `beobachtung`
--
ALTER TABLE `beobachtung`
MODIFY `beobachtungId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT für Tabelle `category`
--
ALTER TABLE `category`
MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `leader`
--
ALTER TABLE `leader`
MODIFY `leaderID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT für Tabelle `participant`
--
ALTER TABLE `participant`
MODIFY `participantId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT für Tabelle `postIt`
--
ALTER TABLE `postIt`
MODIFY `postit` smallint(6) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `postitType`
--
ALTER TABLE `postitType`
MODIFY `postitTypeId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `beobachtung`
--
ALTER TABLE `beobachtung`
ADD CONSTRAINT `beobachtung_ibfk_1` FOREIGN KEY (`activityId`) REFERENCES `activity` (`activityId`),
ADD CONSTRAINT `beobachtung_ibfk_2` FOREIGN KEY (`leaderId`) REFERENCES `leader` (`leaderID`),
ADD CONSTRAINT `beobachtung_ibfk_3` FOREIGN KEY (`participantId`) REFERENCES `participant` (`participantId`),
ADD CONSTRAINT `beobachtung_ibfk_4` FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
