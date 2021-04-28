const html = `<nav className="navbar navbar-default">
    <div className="container-fluid">
        <div className="navbar-header">
            <button
                aria-expanded="false"
                className="navbar-toggle collapsed"
                data-target="#navbar"
                data-toggle="collapse"
                type="button"
            >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">Jobbing</a>
        </div>
        <div className="collapse navbar-collapse" id="navbar">
            <
            % if (isAuthorized) {%>
            <ul class="nav navbar-nav">
            <li><a href="/history">History</a></li>
            </ul>
            <form class="navbar-form navbar-left" action="/stock/search" method="GET">
            <div class="input-group">
            <input type="text" id="query" name="query" class="form-control" placeholder="Search" />
            <div class="input-group-btn">
            <button class="btn btn-default" type="submit">
            <i class="glyphicon glyphicon-search"></i>
            </button>
            </div>
            </div>
            </form>
            <ul class="nav navbar-nav navbar-right">
            <li><a href="/logOut">Log Out</a></li>
            </ul>
            <%} else {%>
            <ul class="nav navbar-nav navbar-right">
            <li><a href="/register">Register</a></li>
            <li><a href="/login">Log In</a></li>
            </ul>
            <%} %>
            </div>
        </div>
</nav>`

const Navbar = {
    render: async (options) => {
        return ejs.render(html, options)
    }
}

export default Navbar