export interface commit {
    sha: string;
    node_id: string;
    commit: commitChild
    url: string;
    html_url: string;
    comments_url: string;
    author: author[];
    commiter: commiter[];
    parents: parents[];
}

interface commitChild {
    author: childAuthor;
    commiter: childCommiter;
    message: string;
    tree: []
    url: string;
    comment_count: number;
    verification: verification;
}

interface childAuthor {
    name: string;
    email: string;
    date: string;
}

interface childCommiter extends childAuthor {}

interface verification {
    verified: boolean;
    reason: string;
    signature: string;
    payload: string;
}

interface author {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

interface commiter extends author {}

interface parents {
    sha: string;
    url: string;
    html_url: string;
}