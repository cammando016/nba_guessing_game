function changeTeamDisplayName(teamName) {
    switch (teamName.toLowerCase()){
      case 'golden state warriors':
        return 'Golden State';
      case 'los angeles clippers':
        return 'Clippers';
      case 'los angeles lakers':
        return 'Lakers';
      case 'new orleans pelicans':
        return 'New Orleans';
      case 'new york knicks':
          return 'New York';
      case 'portland trail blazers':
        return 'Portland';
      case 'san antonio spurs':
        return 'San Antonio';
      default:
        return teamName.split(' ')[0];
    }
}

export default changeTeamDisplayName;