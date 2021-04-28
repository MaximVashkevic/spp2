const html = `
    <div class="container-fluid">
        <div class="navbar-header">
            <button
                aria-expanded="false"
                class="navbar-toggle collapsed"
                data-target="#navbar"
                data-toggle="collapse"
                type="button"
            >
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#/">Jobbing</a>
        </div>
        <div class="collapse navbar-collapse" id="navbar">
            <% if (isAuthorized) { %>
            <ul class="nav navbar-nav">
            <li><a href="#/history">History</a></li>
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
            <li><a href="#/logOut">Log Out</a></li>
            </ul>
            <%} else {%>
            <ul class="nav navbar-nav navbar-right">
            <li><a href="#/register">Register</a></li>
            <li><a href="#/login">Log In</a></li>
            </ul>
            <%} %>
            </div>
        </div>`

const Navbar = {
    render: async (options) => {
        return await ejs.render(html, options)
    }
}

export default Navbar