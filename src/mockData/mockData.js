export const tickets = [
    {
      id: "TK-1001",
      title: "App crashes on login",
      status: "Open",
      statusHistory: [
        { status: "Open", timestamp: new Date(2025, 3, 14).toISOString() }
      ],
      priority: "High",
      category: "Technical Support",
      description: "The application crashes whenever I try to log in on my iPhone.",
      clientName: "Acme Corporation",
      accountNumber: "ACM-10042",
      attachments: [
        { name: "error-screenshot.png", type: "image/png", size: "245KB" },
        { name: "system-log.txt", type: "text/plain", size: "120KB" }
      ],
      assignedTo: 'Unassigned',
      createdAt: new Date(2025, 3, 14).toISOString(),
      updatedAt: new Date(2025, 3, 14).toISOString()
    },

    // {
    //     id: 'TKT-2023-078',
    //     clientName: 'Global Logistics Partners',
    //     accountNumber: 'GLP-90215',
    //     description: 'Integration with new shipping API not working as expected',
    //     priority: 'High',
    //     status: 'Open',
    //     createdDate: '2025-04-14T08:17:33Z',
    //     assignedTo: 'Unassigned',
    //     attachments: [
    //       { name: 'api-error-logs.txt', type: 'text/plain', size: '87KB' },
    //       { name: 'integration-diagram.jpg', type: 'image/jpeg', size: '356KB' },
    //       { name: 'test-case.doc', type: 'application/msword', size: '435KB' }
    //     ]
    //   }

    {
      id: "TK-1002",
      title: "Login button not responsive",
      status: "InProgress",
      statusHistory: [
        { status: "Open", timestamp: new Date(2025, 3, 10).toISOString() },
        { status: "InProgress", timestamp: new Date(2025, 3, 12).toISOString() }
      ],
      priority: "Medium",
      category: "Technical Support",
      description: "Clicking the login button does nothing on the web version.",
      clientName: "Globex Inc.",
      accountNumber: "GLX-20415",
      attachments: [
        { name: "console-output.txt", type: "text/plain", size: "95KB" }
      ],
      assignedTo: 'Unassigned',
      createdAt: new Date(2025, 3, 10).toISOString(),
      updatedAt: new Date(2025, 3, 12).toISOString()
    },
    {
      id: "TK-1003",
      title: "Error 500 on dashboard",
      status: "Resolved",
      statusHistory: [
        { status: "Open", timestamp: new Date(2025, 3, 8).toISOString() },
        { status: "InProgress", timestamp: new Date(2025, 3, 9).toISOString() },
        { status: "Resolved", timestamp: new Date(2025, 3, 13).toISOString() }
      ],
      priority: "High",
      category: "Technical Support",
      description: "I'm getting a 500 server error when I open the dashboard after logging in.",
      clientName: "Wayne Enterprises",
      accountNumber: "WNE-55021",
      attachments: [
        { name: "server-response.json", type: "application/json", size: "67KB" }
      ],
      assignedTo: 'Unassigned',
      createdAt: new Date(2025, 3, 8).toISOString(),
      updatedAt: new Date(2025, 3, 13).toISOString()
    },
    {
      id: "TK-1004",
      title: "Push notifications not working",
      status: "Closed",
      statusHistory: [
        { status: "Open", timestamp: new Date(2025, 3, 5).toISOString() },
        { status: "InProgress", timestamp: new Date(2025, 3, 6).toISOString() },
        { status: "Resolved", timestamp: new Date(2025, 3, 7).toISOString() },
        { status: "Closed", timestamp: new Date(2025, 3, 9).toISOString() }
      ],
      priority: "Low",
      category: "Technical Support",
      description: "Not receiving any push notifications even though they're enabled in settings.",
      clientName: "Stark Industries",
      accountNumber: "STK-87701",
      attachments: [
        { name: "notification-settings.png", type: "image/png", size: "300KB" }
      ],
      assignedTo: 'Unassigned',
      createdAt: new Date(2025, 3, 5).toISOString(),
      updatedAt: new Date(2025, 3, 9).toISOString()
    },
    {
      id: "TK-1005",
      title: "App freezes on settings page",
      status: "InProgress",
      statusHistory: [
        { status: "Open", timestamp: new Date(2025, 3, 7).toISOString() },
        { status: "InProgress", timestamp: new Date(2025, 3, 10).toISOString() }
      ],
      priority: "Medium",
      category: "Technical Support",
      description: "Every time I open the settings page, the app becomes unresponsive.",
      clientName: "Oscorp Ltd.",
      accountNumber: "OSC-44532",
      attachments: [
        { name: "screen-recording.mov", type: "video/quicktime", size: "2.3MB" }
      ],
      assignedTo: 'Unassigned',
      createdAt: new Date(2025, 3, 7).toISOString(),
      updatedAt: new Date(2025, 3, 10).toISOString()
    },
    {
      id: "TK-1006",
      title: "Billing information not saving",
      status: "Resolved",
      statusHistory: [
        { status: "Open", timestamp: new Date(2025, 3, 4).toISOString() },
        { status: "InProgress", timestamp: new Date(2025, 3, 5).toISOString() },
        { status: "Resolved", timestamp: new Date(2025, 3, 8).toISOString() }
      ],
      priority: "High",
      category: "Billing",
      description: "I can't update my credit card information. The system shows an error every time I try to save.",
      clientName: "Initech",
      accountNumber: "INT-99010",
      attachments: [
        { name: "billing-error.png", type: "image/png", size: "180KB" },
        { name: "api-response.json", type: "application/json", size: "45KB" }
      ],
      assignedTo: 'Unassigned',
      createdAt: new Date(2025, 3, 4).toISOString(),
      updatedAt: new Date(2025, 3, 8).toISOString()
    },
    {
      id: "TK-1007",
      title: "Password reset email never arrives",
      status: "InProgress",
      statusHistory: [
        { status: "Open", timestamp: new Date(2025, 3, 9).toISOString() },
        { status: "InProgress", timestamp: new Date(2025, 3, 11).toISOString() }
      ],
      priority: "Medium",
      category: "Account Management",
      description: "I've requested a password reset multiple times but never receive the email.",
      clientName: "Cyberdyne Systems",
      accountNumber: "CYB-80899",
      attachments: [
        { name: "email-logs.txt", type: "text/plain", size: "140KB" }
      ],
      assignedTo: 'Unassigned',
      createdAt: new Date(2025, 3, 9).toISOString(),
      updatedAt: new Date(2025, 3, 11).toISOString()
    },
    {
      id: "TK-1008",
      title: "Data export feature not working",
      status: "Closed",
      statusHistory: [
        { status: "Open", timestamp: new Date(2025, 3, 2).toISOString() },
        { status: "InProgress", timestamp: new Date(2025, 3, 3).toISOString() },
        { status: "Resolved", timestamp: new Date(2025, 3, 5).toISOString() },
        { status: "Closed", timestamp: new Date(2025, 3, 7).toISOString() }
      ],
      priority: "Low",
      category: "Feature Request",
      description: "When I try to export my data to CSV, the download never starts.",
      clientName: "Tyrell Corporation",
      accountNumber: "TYR-67023",
      attachments: [
        { name: "export-settings.png", type: "image/png", size: "110KB" }
      ],
      assignedTo: 'Unassigned',
      createdAt: new Date(2025, 3, 2).toISOString(),
      updatedAt: new Date(2025, 3, 7).toISOString()
    },
    {
      id: "TK-1009",
      title: "Mobile app crashes on photo upload",
      status: "Open",
      statusHistory: [
        { status: "Open", timestamp: new Date(2025, 3, 13).toISOString() }
      ],
      priority: "High",
      category: "Technical Support",
      description: "The app crashes every time I try to upload a profile photo from my gallery.",
      clientName: "Umbrella Corp",
      accountNumber: "UMB-34289",
      attachments: [
        { name: "crash-report.log", type: "text/plain", size: "230KB" }
      ],
      assignedTo: 'Unassigned',
      createdAt: new Date(2025, 3, 13).toISOString(),
      updatedAt: new Date(2025, 3, 13).toISOString()
    },
    {
      id: "TK-1010",
      title: "Cannot connect third-party integrations",
      status: "InProgress",
      statusHistory: [
        { status: "Open", timestamp: new Date(2025, 3, 8).toISOString() },
        { status: "InProgress", timestamp: new Date(2025, 3, 10).toISOString() }
      ],
      priority: "Medium",
      category: "Integration",
      description: "I'm unable to connect my Google Drive account. The authorization process gets stuck.",
      clientName: "Hooli",
      accountNumber: "HLI-92300",
      attachments: [
        { name: "integration-issue.mp4", type: "video/mp4", size: "3.1MB" }
      ],
      assignedTo: 'Unassigned',
      createdAt: new Date(2025, 3, 8).toISOString(),
      updatedAt: new Date(2025, 3, 10).toISOString()
    }
  ];
  
export const agents = [
    { agentId: 'A001', name: 'Alice Johnson', assignedTickets: 12, department: 'Support' },
    { agentId: 'A002', name: 'Bob Smith', assignedTickets: 8, department: 'Sales' },
    { agentId: 'A003', name: 'Charlie Lee', assignedTickets: 15, department: 'Technical' },
    { agentId: 'A004', name: 'Diana Prince', assignedTickets: 5, department: 'Support' },
    { agentId: 'A005', name: 'Ethan Hunt', assignedTickets: 20, department: 'Field Operations' },
    { agentId: 'A006', name: 'Fiona Gallagher', assignedTickets: 7, department: 'Sales' },
    { agentId: 'A007', name: 'George Martin', assignedTickets: 3, department: 'Technical' },
    { agentId: 'A008', name: 'Hannah Wells', assignedTickets: 11, department: 'Support' },
    { agentId: 'A009', name: 'Ian Wright', assignedTickets: 9, department: 'Technical' },
    { agentId: 'A010', name: 'Julia Roberts', assignedTickets: 6, department: 'Sales' },
  ];
  
  