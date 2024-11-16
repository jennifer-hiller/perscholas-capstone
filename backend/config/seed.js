import "dotenv/config";
// Require connection file to connect
import mongoose from "mongoose";

await mongoose.connect(process.env.ATLAS_URI);
// Require Models for delete and create operations
import User from "../models/User.js";
import Task from "../models/Task.js";
import Comment from "../models/Comment.js";

try {
  const users = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      username: "johndoe",
      password: "password123",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      username: "janesmith",
      password: "password123",
    },
    {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      username: "alicejohnson",
      password: "password123",
    },
    {
      name: "Bob Brown",
      email: "bob.brown@example.com",
      username: "bobbrown",
      password: "password123",
    },
    {
      name: "Charlie Davis",
      email: "charlie.davis@example.com",
      username: "charliedavis",
      password: "password123",
    },
    {
      name: "Diana Evans",
      email: "diana.evans@example.com",
      username: "dianaevans",
      password: "password123",
    },
    {
      name: "Ethan Harris",
      email: "ethan.harris@example.com",
      username: "ethanharris",
      password: "password123",
    },
    {
      name: "Fiona Green",
      email: "fiona.green@example.com",
      username: "fionagreen",
      password: "password123",
    },
    {
      name: "George Hill",
      email: "george.hill@example.com",
      username: "georgehill",
      password: "password123",
    },
    {
      name: "Hannah King",
      email: "hannah.king@example.com",
      username: "hannahking",
      password: "password123",
    },
    {
      name: "Ian Lewis",
      email: "ian.lewis@example.com",
      username: "ianlewis",
      password: "password123",
    },
    {
      name: "Julia Martin",
      email: "julia.martin@example.com",
      username: "juliamartin",
      password: "password123",
    },
    {
      name: "Kevin Nelson",
      email: "kevin.nelson@example.com",
      username: "kevinnelson",
      password: "password123",
    },
    {
      name: "Laura Owens",
      email: "laura.owens@example.com",
      username: "lauraowens",
      password: "password123",
    },
    {
      name: "Michael Parker",
      email: "michael.parker@example.com",
      username: "michaelparker",
      password: "password123",
    },
    {
      name: "Nina Quinn",
      email: "nina.quinn@example.com",
      username: "ninaquinn",
      password: "password123",
    },
    {
      name: "Oliver Roberts",
      email: "oliver.roberts@example.com",
      username: "oliverroberts",
      password: "password123",
    },
    {
      name: "Paula Scott",
      email: "paula.scott@example.com",
      username: "paulascott",
      password: "password123",
    },
    {
      name: "Quincy Taylor",
      email: "quincy.taylor@example.com",
      username: "quincytaylor",
      password: "password123",
    },
    {
      name: "Rachel White",
      email: "rachel.white@example.com",
      username: "rachelwhite",
      password: "password123",
    },
  ];

  await User.deleteMany({});

  const createdUsers = await User.create(users);

  console.log("Users: ", createdUsers);

  await Task.deleteMany({});
  const tasks = [
    {
      title: "Complete Project Report",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sagittis dapibus orci a vulputate. Quisque fringilla sagittis lacus, vel commodo metus lacinia eu. Aliquam consectetur ex eu felis scelerisque sollicitudin. Aenean ac lacinia dui. Ut id efficitur lorem. Cras congue consectetur turpis, sit amet suscipit velit mattis in. Fusce volutpat leo ac risus dapibus semper. Nam ut quam vitae ex egestas tempor eu vel erat. Curabitur pulvinar nulla ipsum, in laoreet mi elementum vel. Quisque dapibus bibendum dapibus.",
      content: "Finish the final report for the project.",
      createdBy: createdUsers[0]._id,
      assignedTo: createdUsers[1]._id,
      severity: "High",
    },
    {
      title: "Design New Logo",
      description:
        "Nunc molestie magna vitae erat laoreet fermentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed dignissim aliquet elit eget iaculis. Nullam a maximus erat, vitae laoreet massa. Ut risus arcu, porttitor a pretium id, eleifend nec turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In sed felis magna. Aliquam efficitur, ligula et iaculis aliquet, nibh orci aliquet arcu, nec pulvinar leo ex ac velit. Ut sagittis finibus ipsum nec porta.",
      content: "Create a new logo for the marketing campaign.",
      createdBy: createdUsers[1]._id,
      assignedTo: createdUsers[2]._id,
      severity: "Moderate",
    },
    {
      title: "Update Website",
      description:
        "Praesent fermentum nunc orci. Nulla blandit faucibus ipsum ac sollicitudin. Vestibulum tincidunt tellus sapien, nec congue sapien congue vel. Integer sapien mauris, lacinia nec viverra ac, auctor semper elit. Maecenas pretium sagittis magna vulputate ullamcorper. Ut pulvinar eu purus vitae sollicitudin. Praesent sed molestie sapien, vel imperdiet felis. Aliquam erat volutpat. Integer nec condimentum neque. Donec condimentum condimentum lectus, sit amet mollis nisi vestibulum ut. Duis ante augue, blandit accumsan consequat id, posuere sit amet erat. Morbi quis efficitur massa. Vestibulum commodo quam eget nulla volutpat, non euismod lacus posuere. Sed lacinia, augue id ornare placerat, magna lacus consectetur turpis, eu vehicula elit magna eu ante. Vestibulum auctor, tellus in blandit iaculis, nisi risus convallis nisi, vel aliquet urna erat in leo. Quisque ut rhoncus ante.",
      content: "Implement the new design on the company website.",
      createdBy: createdUsers[2]._id,
      assignedTo: createdUsers[3]._id,
      severity: "Showstopper",
    },
    {
      title: "Prepare Presentation",
      description:
        "Quisque ornare varius sem vel imperdiet. Sed eu suscipit tortor. Morbi feugiat augue mi, at gravida metus tincidunt a. Sed ipsum lacus, dignissim nec dictum quis, tristique ac nunc. Proin eleifend ligula ac magna viverra faucibus. Sed ut luctus arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur non erat ex. Phasellus bibendum neque et nibh aliquam, et hendrerit enim aliquet. Etiam mi nisl, ultrices in volutpat quis, laoreet et quam. Quisque at leo vel metus commodo dignissim nec et ex.",
      content: "Prepare slides for the upcoming conference.",
      createdBy: createdUsers[3]._id,
      assignedTo: createdUsers[4]._id,
      severity: "Low",
    },
    {
      title: "Conduct Market Research",
      description:
        "Vivamus eget neque nec ante bibendum semper. Nullam mi massa, luctus et blandit vitae, hendrerit vel risus. Ut cursus tincidunt orci, id lobortis justo. Aenean auctor nunc vel tellus suscipit aliquet. Vivamus aliquam in tellus quis egestas. Etiam vel enim tempus, eleifend diam ac, facilisis dui. Proin varius lacus volutpat, finibus mauris at, blandit libero. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras fermentum sit amet arcu vel pharetra. Nunc tortor diam, ultricies ac erat nec, congue auctor ex. Integer lobortis quis lacus eget rhoncus. Proin pretium dictum ultricies. Suspendisse rutrum metus ac ipsum varius tempus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis fermentum ultrices pulvinar. Pellentesque eros ex, aliquet ac odio non, sollicitudin rhoncus sapien.",
      content: "Research the latest trends in the industry.",
      createdBy: createdUsers[4]._id,
      assignedTo: createdUsers[5]._id,
      severity: "Moderate",
    },
    {
      title: "Organize Team Meeting",
      description:
        "Donec ipsum ipsum, consectetur in justo ac, volutpat accumsan lacus. Vestibulum ante nisl, fermentum ac varius ut, posuere dignissim ipsum. Aliquam purus lectus, ullamcorper sit amet sapien in, ornare blandit ligula. Integer hendrerit lobortis suscipit. Quisque quis ex eget velit lacinia luctus et ac urna. Maecenas lobortis massa et odio porttitor, imperdiet aliquet neque ultrices. Phasellus quis sem ultricies, condimentum neque vitae, ornare augue. Vivamus ut nisl vestibulum, ornare dui vitae, tincidunt nulla. Quisque ullamcorper, erat quis placerat volutpat, arcu turpis fermentum urna, id suscipit libero augue a erat. Morbi quis libero eros. Donec nibh nisi, tincidunt sed tellus at, dignissim ullamcorper urna. Nunc in felis metus.",
      content: "Schedule and organize the monthly team meeting.",
      createdBy: createdUsers[5]._id,
      assignedTo: createdUsers[6]._id,
      severity: "High",
    },
    {
      title: "Write Blog Post",
      description:
        "Praesent et diam odio. Proin volutpat mollis hendrerit. Nam felis lorem, sollicitudin in justo nec, lacinia auctor justo. Aenean tempus orci porttitor nisl venenatis, sed tincidunt tortor semper. Praesent non diam a arcu ultrices ornare ut nec est. Mauris auctor arcu eu justo vulputate commodo. Fusce ac mauris faucibus, dignissim diam non, iaculis augue. Suspendisse sagittis sem at porta ullamcorper. Duis non libero lectus. Aliquam at velit auctor, iaculis justo et, porttitor felis. Nunc id turpis eu dolor ultricies pulvinar. Fusce interdum mauris vel ultrices dignissim. Cras eu cursus tellus. Ut sollicitudin nisl et dui consequat luctus. Vivamus at elit ornare, finibus orci in, feugiat lorem. Suspendisse in enim facilisis, efficitur magna et, vehicula diam.",
      content: "Draft a blog post about our new product launch.",
      createdBy: createdUsers[6]._id,
      assignedTo: createdUsers[7]._id,
      severity: "Low",
    },
    {
      title: "Analyze Sales Data",
      description:
        "Morbi imperdiet mauris urna, finibus mollis nunc elementum vel. Suspendisse venenatis condimentum nisi ac varius. Sed lacinia augue lacus. Cras sit amet lacus placerat, porttitor lorem quis, varius ipsum. Sed euismod ornare risus quis vulputate. Maecenas lectus enim, sodales sit amet odio at, elementum porta quam. Etiam ac commodo urna. Suspendisse non lobortis ex. Sed vel pellentesque magna, id pharetra est. Mauris nulla nunc, sodales et commodo gravida, lobortis ut odio. Curabitur quis nibh venenatis, mattis erat id, laoreet libero. Nunc interdum vehicula efficitur.",
      content: "Analyze the sales data from the last quarter.",
      createdBy: createdUsers[7]._id,
      assignedTo: createdUsers[8]._id,
      severity: "Moderate",
    },
    {
      title: "Develop Mobile App",
      description:
        "Nam eleifend mi eu dui placerat, ac porta nisi semper. Praesent gravida sem non semper egestas. Aenean ut ipsum et arcu sagittis convallis. Phasellus feugiat vitae ipsum et pretium. Aliquam erat volutpat. Curabitur id dolor sagittis risus hendrerit convallis non ac magna. Nulla non velit vel quam accumsan efficitur. Phasellus ex ante, dignissim ut nulla sit amet, lobortis porta nisl. Pellentesque non consectetur orci, nec pretium sem. Proin vulputate dui ut erat placerat posuere. Cras egestas, tellus suscipit feugiat fringilla, tellus velit ultricies ex, ut varius nunc risus et turpis. Fusce ultricies quam mi, quis viverra lectus dictum nec. Morbi volutpat nibh a dolor ultrices sagittis. Suspendisse fringilla et lectus finibus porttitor. Curabitur consectetur est augue.",
      content: "Start development on the new mobile application.",
      createdBy: createdUsers[8]._id,
      assignedTo: createdUsers[9]._id,
      severity: "High",
    },
    {
      title: "Customer Feedback Survey",
      description:
        "Suspendisse commodo tellus est, ac convallis turpis viverra vitae. Donec molestie, tortor a laoreet commodo, erat nisi sollicitudin mi, venenatis scelerisque nulla sapien at quam. Aenean sit amet nibh nunc. Curabitur maximus rutrum lobortis. Morbi sodales sed lacus eu rhoncus. Nunc et magna accumsan, dictum eros at, porttitor ante. Integer at lacus ac dolor euismod commodo. Fusce malesuada ut sem et faucibus. Quisque tristique sapien risus, sed sagittis mauris ornare eu.",
      content: "Create a survey to gather customer feedback.",
      createdBy: createdUsers[9]._id,
      assignedTo: createdUsers[10]._id,
      severity: "Showstopper",
    },
    {
      title: "Plan Marketing Strategy",
      description:
        "Sed gravida vitae ligula a tempor. Sed placerat, ligula ut tristique vestibulum, risus mi sollicitudin dolor, id malesuada libero nibh in tellus. Aliquam vitae tincidunt eros. Nulla facilisi. Duis feugiat elit a turpis condimentum viverra. Nullam porta maximus sapien a consectetur. Morbi et mi leo. Vestibulum vitae pulvinar nisl, in hendrerit leo. Morbi ac magna congue, blandit odio dapibus, rutrum metus. Fusce eget mi viverra, tincidunt risus non, sagittis magna. Sed sed lectus at neque lobortis dictum non vitae massa. Cras id magna nec ipsum porta laoreet. Sed eleifend lacus eu lorem venenatis, hendrerit porttitor nisl porta. Quisque eget felis at sem lobortis ullamcorper vitae a erat. Aliquam nunc ligula, placerat nec est a, mattis sagittis diam.",
      content: "Develop a marketing strategy for the next quarter.",
      createdBy: createdUsers[10]._id,
      assignedTo: createdUsers[11]._id,
      severity: "Low",
    },
    {
      title: "Test Software Features",
      description:
        "Praesent lacus lorem, pharetra vel placerat in, suscipit quis libero. Aenean rutrum erat erat, vitae eleifend quam molestie vel. Cras sem lectus, blandit consectetur varius sed, bibendum non neque. Phasellus mauris magna, efficitur ut maximus sed, malesuada sit amet lacus. Sed imperdiet ligula vel laoreet commodo. Quisque eros sapien, commodo non ultricies sed, convallis vitae mi. Proin eget justo et ipsum mattis finibus sed nec odio. Phasellus mattis dui ex, ac feugiat erat vehicula vel. Morbi venenatis justo velit, et sodales mi interdum at. Nam euismod facilisis augue. Aliquam cursus, diam eget gravida lobortis, diam neque mollis quam, a luctus orci lectus quis elit. Donec iaculis venenatis massa, in luctus purus finibus vitae.",
      content: "Test the new features in the software update.",
      createdBy: createdUsers[11]._id,
      assignedTo: createdUsers[12]._id,
      severity: "Moderate",
    },
    {
      title: "Create Training Materials",
      description:
        "Vivamus id euismod neque, eu imperdiet dui. Suspendisse dignissim lorem quis hendrerit laoreet. Maecenas feugiat eleifend placerat. Vestibulum eu volutpat nunc. Vivamus bibendum lobortis tincidunt. Vivamus vitae ligula blandit, facilisis nibh non, sollicitudin lacus. Donec ut dapibus ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut in blandit ipsum, ac gravida lectus. Aliquam vitae pulvinar eros. Curabitur porttitor in nunc in sodales. Praesent tincidunt dui non lorem efficitur, vitae imperdiet neque condimentum. In iaculis augue ligula, quis efficitur turpis lobortis a.",
      content: "Develop training materials for new employees.",
      createdBy: createdUsers[12]._id,
      assignedTo: createdUsers[13]._id,
      severity: "High",
    },
    {
      title: "Review Financial Reports",
      description:
        "Donec facilisis justo ut diam hendrerit ullamcorper. Integer ac viverra nulla. Nullam dictum auctor pharetra. Morbi quis nunc a ante luctus vulputate et id erat. Aenean quis justo ligula. Vestibulum magna felis, porta vitae posuere a, luctus vitae tellus. Cras vel auctor lacus. Donec feugiat sem a sapien pretium pulvinar. Nulla facilisi. Vestibulum eget odio nec neque tempus cursus ut in odio. Sed arcu felis, ultrices nec ornare vitae, rhoncus quis lectus. Sed at sem risus.",
      content: "Review the financial reports for accuracy.",
      createdBy: createdUsers[13]._id,
      assignedTo: createdUsers[14]._id,
      severity: "Showstopper",
    },
    {
      title: "Set Up New Workstations",
      description:
        "Morbi leo arcu, dictum eu rutrum vel, eleifend sed tortor. Mauris sollicitudin lobortis nunc, a imperdiet est feugiat a. Ut vulputate malesuada mauris, vitae laoreet ante tincidunt non. Suspendisse sapien metus, scelerisque nec accumsan at, porttitor et eros. Vivamus mollis vitae sapien vel malesuada. Vivamus euismod viverra dui, at feugiat lectus scelerisque vitae. Nunc viverra justo at sagittis lobortis.",
      content: "Set up new computers and workstations for the office.",
      createdBy: createdUsers[14]._id,
      assignedTo: createdUsers[15]._id,
      severity: "Low",
    },
    {
      title: "Coordinate Event Planning",
      description:
        "Fusce venenatis, est ac lacinia vestibulum, libero purus ullamcorper quam, et ultricies sem arcu ac turpis. Vestibulum venenatis laoreet nisl, sed lobortis lacus accumsan nec. Praesent volutpat erat eu tortor posuere, non tincidunt nunc maximus. Fusce sit amet lorem justo. Phasellus pellentesque tempor metus in posuere. Nullam et eros mattis, consequat lectus quis, lacinia nulla. Aliquam tempus ligula ipsum. Nulla et tellus sodales, tempor odio id, tincidunt lacus. Maecenas in congue ante, nec mattis odio.",
      content: "Coordinate the planning of the annual company event.",
      createdBy: createdUsers[15]._id,
      assignedTo: createdUsers[16]._id,
      severity: "Moderate",
    },
    {
      title: "Update Social Media",
      description:
        "Curabitur a porttitor mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque egestas mauris justo, et congue lectus ultricies vel. Cras rhoncus efficitur libero at tristique. Suspendisse bibendum ligula tellus, nec maximus leo varius eget. Pellentesque sit amet mattis purus. Cras nec mauris a leo porta fermentum. Donec semper id dui in faucibus. Mauris ultricies, quam eu rhoncus volutpat, elit mauris suscipit felis, ac mollis augue nisl sed lacus. Nulla non augue vel mi gravida venenatis. Aliquam imperdiet ipsum in tellus pharetra, vel aliquam est tristique. Integer eu semper leo, sit amet tempus massa. Praesent ut neque augue. Donec ullamcorper, augue quis euismod elementum, massa justo bibendum augue, ut pharetra sapien nibh nec ante.",
      content: "Post updates on the company's social media accounts.",
      createdBy: createdUsers[16]._id,
      assignedTo: createdUsers[17]._id,
      severity: "High",
    },
    {
      title: "Draft Legal Documents",
      description:
        "Donec ultrices, ante sit amet ultrices venenatis, diam dolor varius lectus, blandit varius justo erat nec neque. Donec semper ligula accumsan, sodales lectus lacinia, sodales tellus. Pellentesque vitae lorem eget nisi dignissim iaculis. Suspendisse lacinia eu dolor ac pharetra. Pellentesque id magna sollicitudin, gravida sem nec, imperdiet ipsum. In interdum velit sit amet mauris pretium, id pellentesque mauris sodales. Praesent aliquet rhoncus leo vitae elementum. Quisque risus nisl, cursus a metus feugiat, vulputate rutrum ipsum. Mauris blandit mi est, eget vestibulum diam luctus ut. Quisque viverra eleifend fermentum. Vestibulum non pellentesque lorem, ut volutpat velit. Nullam at egestas tortor. Morbi convallis molestie velit quis vestibulum. Nunc facilisis diam a urna mattis, et varius ex euismod.",
      content: "Draft the necessary legal documents for the merger.",
      createdBy: createdUsers[17]._id,
      assignedTo: createdUsers[18]._id,
      severity: "Showstopper",
    },
    {
      title: "Optimize SEO",
      description:
        "Praesent eget arcu ac eros auctor posuere et et purus. Donec non tortor dictum, dapibus massa quis, sollicitudin augue. Maecenas placerat aliquet massa, sit amet convallis eros dictum placerat. Aliquam ut mattis diam. Vivamus lobortis risus at est bibendum dapibus eu in orci. In eu libero pretium, facilisis nisi ut, rhoncus arcu. Curabitur ut leo blandit, scelerisque massa vel, suscipit tellus. Nam tristique condimentum aliquet.",
      content: "Optimize the website for better search engine rankings.",
      createdBy: createdUsers[18]._id,
      assignedTo: createdUsers[19]._id,
      severity: "Low",
    },
    {
      title: "Conduct Employee Survey",
      description:
        "Mauris at felis id velit auctor vehicula. Suspendisse congue turpis eget ex rhoncus, in pulvinar neque faucibus. Donec aliquet justo ex, at malesuada lorem varius non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris nisl dui, volutpat sed blandit eu, aliquet sed nisl. Praesent vestibulum in urna in sagittis. Phasellus convallis suscipit justo, et faucibus ex iaculis at. Aenean egestas nulla nisi, at ornare lectus faucibus egestas.",
      content: "Conduct a survey to gather employee feedback.",
      createdBy: createdUsers[19]._id,
      assignedTo: createdUsers[0]._id,
      severity: "Moderate",
    },
  ];

  const createdTasks = await Task.create(tasks);

  console.log("Tasks: ", createdTasks);

  // Update each user's "created" and "assigned" properties
  for (const task of createdTasks) {
    await User.findByIdAndUpdate(task.createdBy, {
      $push: { created: task._id },
    });

    await User.findByIdAndUpdate(task.assignedTo, {
      $push: { assigned: task._id },
    });
  }
  const comments = [
    {
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      author: createdUsers[0]._id,
      task: createdTasks[0]._id,
    },
    {
      content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: createdUsers[1]._id,
      task: createdTasks[1]._id,
    },
    {
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      author: createdUsers[2]._id,
      task: createdTasks[2]._id,
    },
    {
      content:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
      author: createdUsers[3]._id,
      task: createdTasks[3]._id,
    },
    {
      content:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
      author: createdUsers[4]._id,
      task: createdTasks[4]._id,
    },
    {
      content: "Mollit anim id est laborum.",
      author: createdUsers[5]._id,
      task: createdTasks[5]._id,
    },
    {
      content: "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.",
      author: createdUsers[6]._id,
      task: createdTasks[6]._id,
    },
    {
      content:
        "Nullam varius, turpis et commodo pharetra, est eros bibendum elit.",
      author: createdUsers[7]._id,
      task: createdTasks[7]._id,
    },
    {
      content: "Velit egestas dui id ornare arcu odio ut sem nulla.",
      author: createdUsers[8]._id,
      task: createdTasks[8]._id,
    },
    {
      content:
        "Amet consectetur adipiscing elit pellentesque habitant morbi tristique.",
      author: createdUsers[9]._id,
      task: createdTasks[9]._id,
    },
    {
      content: "Senectus et netus et malesuada fames ac turpis egestas.",
      author: createdUsers[10]._id,
      task: createdTasks[10]._id,
    },
    {
      content:
        "Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.",
      author: createdUsers[11]._id,
      task: createdTasks[11]._id,
    },
    {
      content: "Donec eu libero sit amet quam egestas semper.",
      author: createdUsers[12]._id,
      task: createdTasks[12]._id,
    },
    {
      content: "Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
      author: createdUsers[13]._id,
      task: createdTasks[13]._id,
    },
    {
      content: "Quisque sit amet est et sapien ullamcorper pharetra.",
      author: createdUsers[14]._id,
      task: createdTasks[14]._id,
    },
    {
      content:
        "Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi.",
      author: createdUsers[15]._id,
      task: createdTasks[15]._id,
    },
    {
      content:
        "Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci.",
      author: createdUsers[16]._id,
      task: createdTasks[16]._id,
    },
    {
      content:
        "Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero.",
      author: createdUsers[17]._id,
      task: createdTasks[17]._id,
    },
    {
      content:
        "Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.",
      author: createdUsers[18]._id,
      task: createdTasks[18]._id,
    },
    {
      content:
        "Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent.",
      author: createdUsers[19]._id,
      task: createdTasks[19]._id,
    },
  ];
  await Comment.deleteMany({});
  const createdComments = await Comment.create(comments);

  // Update each user and task "comments" properties
  for (const comment of createdComments) {
    await User.findByIdAndUpdate(comment.author, {
      $push: { comments: comment._id },
    });
    await Task.findByIdAndUpdate(comment.task, {
      $push: { comments: comment._id },
    });
  }
} catch (err) {
  console.log(err);
} finally {
  await mongoose.connection.close();
}
