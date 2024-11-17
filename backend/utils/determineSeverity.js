const determineSeverity = (angleChange, velocityChange) => {
    // Define thresholds for severity
    const angleThresholds = {
        Minor: 5,
        Moderate: 15,
        Severe: 30,
        Critical: 45,
    };

    const velocityThresholds = {
        Minor: 2,
        Moderate: 5,
        Severe: 10,
        Critical: 15,
    };

    if (angleChange > angleThresholds.Critical && velocityChange > velocityThresholds.Critical) {
        return 'Critical';
    } else if (angleChange > angleThresholds.Severe && velocityChange > velocityThresholds.Severe) {
        return 'Severe';
    } else if (angleChange > angleThresholds.Moderate && velocityChange > velocityThresholds.Moderate) {
        return 'Moderate';
    } else if (angleChange > angleThresholds.Minor && velocityChange > velocityThresholds.Minor) {
        return 'Minor';
    } else {
        return 'Minor'; // Default to Minor if no thresholds are exceeded
    }
};

module.exports = determineSeverity;